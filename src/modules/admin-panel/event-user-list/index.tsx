'use client';

import { useLogic } from './useLogic';

export const EventUserList = () => {
  const { getEventList } = useLogic();

  return (
    <div className="overflow-y-auto px-4 sm:px-10 py-6 lg:p-8 w-full">
      <div className="mb-12">
        <h3 className="text-[1.7rem] sm:text-3xl font-semibold ml-3 sm:ml-0">
          Events
        </h3>
      </div>
      {getEventList()}
    </div>
  );
};
