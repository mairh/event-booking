// cspell:ignore noninteractive
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- This is disabled to align with the examples provided in the official documentation */
/* eslint-disable jsx-a11y/control-has-associated-label -- This is disabled to align with the examples provided in the official documentation */

'use client';

import { ChevronDownIcon, LeaveIcon } from '@sanity/icons';

import { useLogoutButton } from '@/modules/common';

export const DropdownMenu = () => {
  const { username, logout, getLogoutButtonText } = useLogoutButton();

  if (!username) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1 w-32">
          <span className="loading loading-spinner loading-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Hi, {username}
        <ChevronDownIcon />
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-100 border rounded-box z-[1] p-2 mt-1 shadow"
      >
        <button
          className="btn btn-ghost flex justify-start w-32 px-1"
          onClick={logout}
        >
          <LeaveIcon width={30} height={30} />
          {getLogoutButtonText && getLogoutButtonText()}
        </button>
      </div>
    </div>
  );
};
