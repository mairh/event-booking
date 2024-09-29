import { PropsWithChildren } from 'react';

import { Event, ScheduleIds } from '../../types';

export type ListWrapperProps = {
  listTitle: string;
} & PropsWithChildren;

export type ListProps = ScheduleIds & {
  isAdminPanel?: boolean;
  userId?: string;
};

export type SubscriptionUpdate = {
  documentId: string;
  result: Omit<Event, 'id'>;
  transition: 'appear' | 'disappear' | 'update';
};
