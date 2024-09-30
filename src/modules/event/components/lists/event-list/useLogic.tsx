import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { useEvents, USER_EVENTS_CHANNEL } from '@/modules/common';

import { EventCard } from '../../cards';
import { EmptyList } from '../empty-list';
import { EventListContentProps } from './types';

export const useLogic = (params: EventListContentProps) => {
  const { scheduleIds, isAdminPanel, userId } = params;

  const session = useSession();

  const { events } = useEvents({ session });

  const [schedule, setSchedule] = useState<string[]>([]);

  useEffect(() => {
    if (session.status === 'loading') {
      return;
    }

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
