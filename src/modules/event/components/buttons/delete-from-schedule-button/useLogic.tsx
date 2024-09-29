import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { USER_EVENTS_CHANNEL } from '@/modules/common';

import { DeleteFromScheduleButtonProps } from '../types';

export const useLogic = (params: DeleteFromScheduleButtonProps) => {
  const { eventId, userId } = params;

  const [deleteEventId, setDeleteEventId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();

  const clickHandler = () => {
    setIsLoading(true);
    setDeleteEventId(eventId);
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (!deleteEventId) {
      return;
    }

    const deleteEvent = async () => {
      const id = userId ?? session.data?.user.id;
      const channel = `${USER_EVENTS_CHANNEL}${id}`;

      await fetch('/api/user-event', {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          channel,
          eventId: deleteEventId,
          userId: id,
        }),
      });
    };

    void deleteEvent();
  }, [deleteEventId]);

  return {
    clickHandler,
    isLoading,
  };
};
