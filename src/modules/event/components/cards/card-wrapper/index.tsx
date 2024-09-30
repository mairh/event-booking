'use client';

import { CardWrapperProps } from './types';
import { useLogic } from './useLogic';

export const CardWrapper = (props: CardWrapperProps) => {
  const {
    event: { title },
    children,
  } = props;

  const { getEventDate } = useLogic(props);

  return (
    <div className="card card-bordered items-center card-side bg-base-100 shadow-lg h-32">
      <div className="flex flex-col justify-center items-center w-20 md:w-20 lg:w-28 sm:w-32 xl:w-32 h-[calc(7rem_-_12px)] md:h-[calc(7rem_-_12px)] sm:h-[calc(100%_-_1rem)] xl:h-[calc(100%_-_1rem)] bg-gradient-to-r from-slate-300 to-slate-500 ml-2.5 my-2.5 rounded-md">
        {getEventDate()}
      </div>
      <div className="card-body justify-center p-3 md:p-4 sm:p-5">
        <h3 className="card-title text-lg font-bold">{title}</h3>
      </div>
      <div className="card-actions justify-end items-center mr-2.5 my-1.5 w-20 md:w-20 sm:w-64 xl:w-64">
        {children}
      </div>
    </div>
  );
};

export * from './card-wrapper-admin';

export * from './events-card-wrapper';
