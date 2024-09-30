'use client';

import { useEffect, useState } from 'react';

import { Event } from '@/modules/event/types';

import { SessionType, SubscriptionUpdate } from '../types';

export const useEvents = (params: { session: SessionType }) => {
  const { session } = params;

  const [events, setEvents] = useState<Event[]>([]);

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
        break;
      }
      case 'disappear': {
        removeEvent(eventId);
        break;
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
        break;
      }
      default: {
        console.warn(`Unhandled transition type: ${String(data.transition)}`);

        break;
      }
    }
  };

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

  useEffect(() => {
    if (session.status === 'loading') {
      return;
    }

    void fetchInitialEvents();

    // SSE to subscribe to events updates
    const eventSource = new EventSource('/api/events-subscribe');

    eventSource.onmessage = (eventMessage) => {
      const data = JSON.parse(eventMessage.data);

      handleSubscriptionUpdate(data as SubscriptionUpdate);
    };

    return () => {
      eventSource.close();
    };
  }, [session]);

  return {
    events,
  };
};
