import { useCallback } from 'react';

import { transformFullEventDate } from '../../utils';
import { EventDetailsModalProps } from './types';

export const useLogic = (props: EventDetailsModalProps) => {
  const { isOpen, event } = props;

  const modalStyles = useCallback(() => {
    if (isOpen) {
      return 'modal modal-open';
    }

    return 'modal';
  }, [isOpen]);

  const eventStart = transformFullEventDate(event.startDate);
  const eventEnd = transformFullEventDate(event.endDate);

  return {
    modalStyles,
    eventStart,
    eventEnd,
  };
};
