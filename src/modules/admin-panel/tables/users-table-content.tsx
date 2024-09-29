/* eslint-disable jsx-a11y/control-has-associated-label -- This is disabled to align with the examples provided in the official documentation */

import { UsersTableRow } from '../users-table-row';
import { UsersTableContentProps } from './types';

export const UsersTableContent = (props: UsersTableContentProps) => {
  const { users } = props;

  return (
    <div className="overflow-x-auto px-4 sm:px-10 py-6 lg:p-8 w-full lg:w-auto">
      <div>
        <h3 className="text-[1.7rem] sm:text-3xl font-semibold ml-3 sm:ml-0">
          Users
        </h3>
      </div>
      <table className="table mt-12 lg:mt-16">
        <thead>
          <tr>
            <th />
            <th className="text-base">Username</th>
            <th className="text-base">Name</th>
            <th className="text-base">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return <UsersTableRow key={user.id} user={user} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
