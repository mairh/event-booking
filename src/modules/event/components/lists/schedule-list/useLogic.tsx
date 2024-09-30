import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { SubscriptionUpdate, USER_EVENTS_CHANNEL } from '@/modules/common';

import { Event } from '../../../types';
import { ScheduleCard } from '../../cards';
import { EmptyList } from '../empty-list';
import { ListProps } from '../types';

export const useLogic = (props: ListProps) => {
  const { scheduleIds, isAdminPanel, userId } = props;

  const session = useSession();

  const [eventIds, setEventIds] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<Event[]>([]);

  const updateEvents = (updatedEvent: Event) => {
    setSchedule((prevState) => {
      return prevState.map((event) => {
        return event.id === updatedEvent.id ? updatedEvent : event;
      });
    });
  };

  const handleEventUpdate = (data: SubscriptionUpdate) => {
    // API adds 'drafts.' before documentId when event is created but unpublished.
    // Here we separate the 'drafts.' part to check and show only published events.
    const [eventId, _rest] = data.documentId.split('.');

    if (eventId === 'drafts') {
      return;
    }

    if (data.transition === 'update') {
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
    }
  };

  useEffect(() => {
    if (session.status === 'loading') {
      return;
    }

    const id = userId ?? session.data?.user.id;
    const channel = `${USER_EVENTS_CHANNEL}${id}`;

    const userEventSource = new EventSource(
      `/api/user-events-subscribe/${channel}`,
    );

    userEventSource.onmessage = (events) => {
      const data = JSON.parse(events.data);

      setEventIds(data.eventIds as string[]);
    };

    // Update schedule if event data was edited in Sanity CMS
    const eventSource = new EventSource('/api/events-subscribe');

    eventSource.onmessage = (events) => {
      const data = JSON.parse(events.data);

      handleEventUpdate(data as SubscriptionUpdate);
    };

    return () => {
      userEventSource.close();
      eventSource.close();
    };
  }, [session]);

  useEffect(() => {
    if (scheduleIds) {
      setEventIds(scheduleIds);
    }
  }, [scheduleIds]);

  useEffect(() => {
    if (!eventIds.length) {
      setSchedule([]);

      return;
    }

    const fetchData = async () => {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(eventIds),
      });

      const data = await res.json();

      const updatedSchedule: Event[] = data.schedule.map((event: any) => {
        return {
          id: event._id,
          title: event.title,
          description: event.description,
          startDate: event.startDate,
          endDate: event.endDate,
          location: event.location,
          coverImage: event.coverImage,
        };
      });

      setSchedule(updatedSchedule);
    };

    void fetchData();
  }, [eventIds]);

  const getSchedule = useCallback(() => {
    if (schedule.length) {
      return (
        <ul className="flex flex-col gap-2.5 collapse-content">
          {schedule.map((event) => (
            <li key={event.id}>
              <ScheduleCard
                event={event}
                isAdminPanel={isAdminPanel}
                userId={userId}
              />
            </li>
          ))}
        </ul>
      );
    }

    const isScheduleLoading = !schedule.length && eventIds.length;

    if (isScheduleLoading || session.status === 'loading' || !scheduleIds) {
      return (
        <EmptyList>
          <span className="loading loading-spinner loading-md" />
        </EmptyList>
      );
    }

    return (
      <EmptyList>You have not added an event to your schedule yet</EmptyList>
    );
  }, [schedule, eventIds, scheduleIds, session]);

  return {
    getSchedule,
  };
};
