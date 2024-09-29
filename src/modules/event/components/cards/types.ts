import { PropsWithChildren } from 'react';

import { Event, ScheduleIds } from '../../types';

export type EventCardProps = ScheduleCardProps & ScheduleIds;

export type CardWrapperProps = {
  event: Event;
} & PropsWithChildren;

export type ScheduleCardProps = {
  event: Event;
  isAdminPanel?: boolean;
  userId?: string;
};
