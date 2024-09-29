import React, { useCallback } from 'react';

import { transformEventDate } from '@/modules/event/utils';

import { CardWrapperProps } from './types';

export const useLogic = (props: CardWrapperProps) => {
  const {
    event: { startDate, endDate },
  } = props;

  const eventDate = transformEventDate(startDate, endDate);

  const getEventDate = useCallback(() => {
    return eventDate.map((date, index) => (
      <React.Fragment key={index}>
        <p className="text-white text-xl text-center">{date}</p>
        {index < eventDate.length - 1 && (
          <p className="text-white text-xl text-center leading-5"> — </p>
        )}
      </React.Fragment>
    ));
  }, [eventDate]);

  return {
    getEventDate,
  };
};
