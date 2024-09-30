'use client';

import { CardWrapperProps } from './types';
import { useLogic } from './useLogic';

export const EventsCardWrapper = (props: CardWrapperProps) => {
  const {
    event: { title },
    children,
  } = props;

  const { getEventDate } = useLogic(props);

  return (
    <div className="card items-center card-side bg-base-100 h-32">
      <div className="flex flex-col justify-center items-center w-20 sm:w-24 md:w-32 h-[calc(7rem_-_12px)] sm:h-[calc(100%_-_1rem)] bg-gradient-to-r from-slate-300 to-slate-500 ml-2.5 my-2.5 rounded-md">
        {getEventDate()}
      </div>
      <div className="card-body justify-center p-3 sm:p-5">
        <h3 className="card-title text-lg md:text-xl font-bold">{title}</h3>
      </div>
      <div className="card-actions justify-end items-center mr-2.5 my-1.5 w-20 md:w-20 sm:w-64 xl:w-64">
        {children}
      </div>
    </div>
  );
};
