import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';

import { USER_EVENTS_CHANNEL } from '@/modules/common';

import { AddToScheduleButtonProps } from '../types';

export const useLogic = (params: AddToScheduleButtonProps) => {
  const { eventId, scheduleIds, userId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();

  const isDisabled = useMemo(() => {
    if (scheduleIds) {
      return scheduleIds.includes(eventId);
    }
  }, [scheduleIds]);

  const [newEventId, setNewEventId] = useState<string>('');

  const clickHandler = () => {
    setIsLoading(true);
    setNewEventId(eventId);
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [scheduleIds]);

  useEffect(() => {
    if (!newEventId) {
      return;
    }

    const addNewEvent = async () => {
      const id = userId ?? session.data?.user.id;
      const channel = `${USER_EVENTS_CHANNEL}${id}`;

      await fetch('/api/user-event', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          channel,
          eventId: newEventId,
          userId: id,
        }),
      });
    };

    void addNewEvent();
    setNewEventId('');
  }, [newEventId]);

  return {
    isDisabled,
    clickHandler,
    isLoading,
  };
};
