import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { USER_EVENTS_CHANNEL } from '@/modules/common';
import { Event } from '@/modules/event/types';

import { EventCard } from '../../cards';
import { EmptyList } from '../empty-list';
import { SubscriptionUpdate } from '../types';
import { EventListContentProps } from './types';

export const useLogic = (params: EventListContentProps) => {
  const { scheduleIds, isAdminPanel, userId } = params;

  const session = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);

  const removeEvent = (eventId: string) => {
    setEvents((prevState) => {
      return prevState.filter((event) => event.id !== eventId);
    });
  };

  const addEvent = (newEvent: Event) => {
    setEvents((prevState) => {
      return [...prevState, newEvent];
    });
  };

  const updateEvents = (event: Event) => {
    setEvents((prevState) => {
      return prevState.map((currentEvent) => {
        return currentEvent.id === event.id ? event : currentEvent;
      });
    });
  };

  const handleSubscriptionUpdate = (data: SubscriptionUpdate) => {
    const [eventId, _rest] = data.documentId.split('.');

    if (eventId === 'drafts') {
      return;
    }

    switch (data.transition) {
      case 'appear': {
        const event: Event = {
          id: eventId,
          title: data.result.title,
          description: data.result.description,
          startDate: data.result.startDate,
          endDate: data.result.endDate,
          location: data.result.location,
          coverImage: data.result.coverImage,
        };

        addEvent(event);
        break; // Replaced return with break
      }
      case 'disappear': {
        removeEvent(eventId);
        break; // Replaced return with break
      }
      case 'update': {
        const event: Event = {
          id: eventId,
          title: data.result.title,
          description: data.result.description,
          startDate: data.result.startDate,
          endDate: data.result.endDate,
          location: data.result.location,
          coverImage: data.result.coverImage,
        };

        updateEvents(event);
        break; // Replaced return with break
      }
      default: {
        console.warn(`Unhandled transition type: ${String(data.transition)}`);

        break; // Replaced return with break
      }
    }
  };

  useEffect(() => {
    if (session.status === 'loading') {
      return;
    }

    const fetchInitialEvents = async () => {
      const res = await fetch('/api/events');

      const data = await res.json();

      if (data) {
        const initialData: Event[] = data.events.map((event: any) => {
          return {
            id: event._id,
            title: event.title ?? '',
            description: event.description ?? '',
            startDate: event.startDate ?? '',
            endDate: event.endDate ?? '',
            location: event.location ?? '',
            coverImage: event.coverImage ?? '',
          };
        });

        setEvents(initialData);
      }
    };

    void fetchInitialEvents();

    const eventSource = new EventSource('/api/events-subscribe');

    eventSource.onmessage = (eventMessage) => {
      const data = JSON.parse(eventMessage.data);

      handleSubscriptionUpdate(data as SubscriptionUpdate);
    };

    const id = (userId ?? session.data?.user.id) as string;
    const channel = `${USER_EVENTS_CHANNEL}${id}`;

    const userEventSource = new EventSource(
      `/api/user-events-subscribe/${channel}`,
    );

    userEventSource.onmessage = (userEventMessage) => {
      const data = JSON.parse(userEventMessage.data);

      setSchedule(data.eventIds as string[]);
    };

    return () => {
      eventSource.close();
      userEventSource.close();
    };
  }, [session]);

  useEffect(() => {
    if (scheduleIds) {
      setSchedule(scheduleIds);
    }
  }, [scheduleIds]);

  const getEventList = useCallback(() => {
    const isEventListLoading = !events.length && schedule.length;

    if (session.status === 'loading' || !scheduleIds || isEventListLoading) {
      return (
        <EmptyList>
          <span className="loading loading-spinner loading-md" />
        </EmptyList>
      );
    }

    if (events.length) {
      return (
        <ul className="flex flex-col gap-2.5 collapse-content">
          {events.map((event) => (
            <li key={event.id}>
              <EventCard
                event={event}
                scheduleIds={schedule}
                isAdminPanel={isAdminPanel}
                userId={userId}
              />
            </li>
          ))}
        </ul>
      );
    }

    return <EmptyList>No events are available</EmptyList>;
  }, [events, schedule, scheduleIds, session]);

  return {
    getEventList,
  };
};
