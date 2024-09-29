'use client';

import { EventButton } from '../event-button';
import { EventButtonAdmin } from '../event-button-admin';
import { DeleteFromScheduleButtonProps } from '../types';
import { useLogic } from './useLogic';

export const DeleteFromScheduleButton = (
  props: DeleteFromScheduleButtonProps,
) => {
  const { isAdminPanel } = props;

  const { clickHandler, isLoading } = useLogic(props);

  if (isAdminPanel) {
    return (
      <EventButtonAdmin
        title="Remove"
        onClick={clickHandler}
        showSpinner={isLoading}
      />
    );
  }

  return (
    <EventButton
      title="Remove"
      onClick={clickHandler}
      showSpinner={isLoading}
    />
  );
};
