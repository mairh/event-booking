'use client';

import { EventButton } from '../event-button';
import { EventButtonAdmin } from '../event-button-admin';
import { ViewDetailsButtonProps } from '../types';

export const ViewDetailsButton = (props: ViewDetailsButtonProps) => {
  const { onClick, isAdminPanel } = props;

  if (isAdminPanel) {
    return <EventButtonAdmin title="View details" onClick={onClick} />;
  }

  return <EventButton title="View details" onClick={onClick} />;
};
