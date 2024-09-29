'use client';

import { EventButton } from '../event-button';
import { EventButtonAdmin } from '../event-button-admin';
import { AddToScheduleButtonProps } from '../types';
import { useLogic } from './useLogic';

export const AddToScheduleButton = (props: AddToScheduleButtonProps) => {
  const { isAdminPanel } = props;

  const { clickHandler, isDisabled, isLoading } = useLogic(props);

  if (isAdminPanel) {
    return (
      <EventButtonAdmin
        title="Attend"
        onClick={clickHandler}
        isDisabled={isDisabled}
        showSpinner={isLoading}
      />
    );
  }

  return (
    <EventButton
      title="Attend"
      onClick={clickHandler}
      isDisabled={isDisabled}
      showSpinner={isLoading}
    />
  );
};
