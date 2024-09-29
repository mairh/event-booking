'use client';

import { LeaveIcon } from '@sanity/icons';

import { useLogoutButton } from '@/modules/common';

import { ButtonWrapper } from './button-wrapper';

export const LogoutButton = () => {
  const { logout, getLogoutButtonText } = useLogoutButton();

  if (!getLogoutButtonText) {
    return (
      <div className="w-full flex pl-3">
        <span className="loading loading-spinner" />
      </div>
    );
  }

  return (
    <ButtonWrapper onClick={logout}>
      <LeaveIcon width={30} height={30} />
      <p className="text-base font-normal	">{getLogoutButtonText()}</p>
    </ButtonWrapper>
  );
};
