// cspell:ignore noninteractive
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- This is disabled to align with the examples provided in the official documentation */

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { useEvents } from '@/modules/common';
import { EmptyList } from '@/modules/event';

import { EventUserTable } from '../tables';
import { UsersEvents } from '../types';
import { EventUserItem } from './event-user-item';

export const useLogic = () => {
  const session = useSession();

  const { events } = useEvents({ session });

  const [usersEvents, setUsersEvents] = useState<UsersEvents>({});

  const fetchInitialUsersEvents = async () => {
    const res = await fetch('/api/user-events');

    const data = await res.json();

    if (data) {
      setUsersEvents(data.usersEvents);
    }
  };

  useEffect(() => {
    if (session.status === 'loading') {
      return;
    }

    void fetchInitialUsersEvents();

    const eventUsersSource = new EventSource('/api/event-users-subscribe');

    eventUsersSource.onmessage = (eventUsersMessage) => {
      const data = JSON.parse(eventUsersMessage.data);

      setUsersEvents((prevState) => {
        const userId = Object.keys(data)[0];

        return {
          ...prevState,
          [userId]: {
            ...prevState[userId],
            scheduleIds: data[userId],
          },
        };
      });
    };

    return () => {
      eventUsersSource.close();
    };
  }, [session]);

  const getEventList = useCallback(() => {
    if (events.length) {
      return events.map((event) => {
        return (
          <div
            key={event.id}
            tabIndex={0}
            className="collapse collapse-arrow border my-2.5 w-auto"
          >
            <div className="collapse-title p-0 pr-6 sm:pr-10">
              <EventUserItem event={event} />
            </div>
            <div className="collapse-content flex flex-col items-center sm:pl-16 sm:pr-8">
              <EventUserTable usersEvents={usersEvents} eventId={event.id} />
            </div>
          </div>
        );
      });
    }

    return <EmptyList>No events are available</EmptyList>;
  }, [events, usersEvents]);

  return {
    getEventList,
  };
};
