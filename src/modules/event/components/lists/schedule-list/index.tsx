'use client';

import { ListWrapper } from '../list-wrapper';
import { ListProps } from '../types';
import { useLogic } from './useLogic';

export const ScheduleList = (props: ListProps) => {
  const { getSchedule } = useLogic(props);

  return <ListWrapper listTitle="Schedule">{getSchedule()}</ListWrapper>;
};
