'use client';

import { Header } from '@/modules/auth';
import { EventList, ScheduleList } from '@/modules/event';

import { UserPageContentProps } from './types';
import { useLogic } from './useLogic';

export const UserPageContent = (props: UserPageContentProps) => {
  const { hasHeader = false, ...restProps } = props;

  const { scheduleIds } = useLogic(props);

  return (
    <div>
      {hasHeader && <Header />}
      <div className="flex flex-col md:flex-row">
        <div className="w-full">
          <ScheduleList scheduleIds={scheduleIds} {...restProps} />
        </div>
        <div className="w-full">
          <EventList scheduleIds={scheduleIds} {...restProps} />
        </div>
      </div>
    </div>
  );
};
