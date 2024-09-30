import { PropsWithChildren } from 'react';

import { ScheduleIds } from '../../types';

export type ListWrapperProps = {
  listTitle: string;
} & PropsWithChildren;

export type ListProps = ScheduleIds & {
  isAdminPanel?: boolean;
  userId?: string;
};
