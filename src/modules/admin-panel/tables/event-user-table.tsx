/* eslint-disable jsx-a11y/control-has-associated-label -- This is disabled to align with the examples provided in the official documentation */

'use client';

import { UserList } from '../user-list';
import { EventUserTableProps } from './types';

export const EventUserTable = (props: EventUserTableProps) => {
  const { usersEvents, eventId } = props;

  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th />
          <th>Username</th>
          <th className="flex justify-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(usersEvents).map(([key, value]) => {
          return (
            <UserList
              key={key}
              username={value.username}
              userId={key}
              scheduleIds={value.scheduleIds}
              eventId={eventId}
            />
          );
        })}
      </tbody>
    </table>
  );
};
