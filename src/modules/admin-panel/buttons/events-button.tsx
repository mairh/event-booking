'use client';

import { TaskIcon } from '@sanity/icons';

import { ButtonWrapper } from './button-wrapper';
import { useDrawerButton } from './hooks';
import { DrawerButtonProps } from './types';

export const EventsButton = (props: DrawerButtonProps) => {
  const { eventsClickHandler } = useDrawerButton(props);

  return (
    <ButtonWrapper onClick={eventsClickHandler}>
      <TaskIcon width={30} height={30} />
      <p className="text-base font-normal	">Events</p>
    </ButtonWrapper>
  );
};
