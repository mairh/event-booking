'use client';

import { ListWrapper } from '../list-wrapper';
import { EventListContentProps } from './types';
import { useLogic } from './useLogic';

export const EventList = (props: EventListContentProps) => {
  const { getEventList } = useLogic(props);

  return (
    <ListWrapper listTitle="Available Events">{getEventList()}</ListWrapper>
  );
};
