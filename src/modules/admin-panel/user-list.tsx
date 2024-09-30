'use client';

import { useMemo } from 'react';

import { AddToScheduleButton, DeleteFromScheduleButton } from '@/modules/event';

import { UserListProps } from './types';

export const UserList = (props: UserListProps) => {
  const { userId, username, scheduleIds, eventId } = props;

  const isAttending = useMemo(() => {
    return scheduleIds.includes(eventId);
  }, [scheduleIds, eventId]);

  return (
    <tr>
      <th className="sm:text-lg">{userId}</th>
      <td className="sm:text-lg">{username}</td>
      <td className="flex justify-center">
        {isAttending && (
          <DeleteFromScheduleButton
            eventId={eventId}
            userId={userId}
            isAdminPanel
          />
        )}
        {!isAttending && (
          <AddToScheduleButton
            eventId={eventId}
            userId={userId}
            isAdminPanel
            scheduleIds={scheduleIds}
          />
        )}
      </td>
    </tr>
  );
};
