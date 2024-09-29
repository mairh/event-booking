'use client';

import { UsersIcon } from '@sanity/icons';

import { ButtonWrapper } from './button-wrapper';
import { useDrawerButton } from './hooks';
import { DrawerButtonProps } from './types';

export const UsersButton = (props: DrawerButtonProps) => {
  const { usersClickHandler } = useDrawerButton(props);

  return (
    <ButtonWrapper onClick={usersClickHandler}>
      <UsersIcon width={30} height={30} />
      <p className="text-base font-normal	">Users</p>
    </ButtonWrapper>
  );
};
