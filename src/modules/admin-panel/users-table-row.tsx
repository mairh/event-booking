'use client';

import { useRouter } from 'next/navigation';

import { UserRole } from '../data';
import { UsersTableRowProps } from './types';

export const UsersTableRow = (props: UsersTableRowProps) => {
  const {
    user: { id, username, name, role },
  } = props;

  const router = useRouter();

  const rowClickHandler = () => {
    router.push(`/admin-panel/user/${id}?username=${username}`);
  };

  const roleStyle = role === UserRole.ADMIN ? 'badge-accent' : 'badge-neutral';

  return (
    <tr className="hover hover:cursor-pointer h-20" onClick={rowClickHandler}>
      <th>{id}</th>
      <td>{username}</td>
      <td>{name}</td>
      <td>
        <div className={`badge ${roleStyle}`}>{role}</div>
      </td>
    </tr>
  );
};
