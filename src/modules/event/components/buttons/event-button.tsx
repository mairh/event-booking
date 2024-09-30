'use client';

import { EventButtonProps } from './types';

export const EventButton = (props: EventButtonProps) => {
  const { title, onClick, isDisabled = false, showSpinner = false } = props;

  const getButtonText = () => {
    if (!showSpinner) {
      return title;
    }

    return <span className="loading loading-spinner" />;
  };

  return (
    <button
      className="btn w-20 md:w-20 sm:w-28 lg:w-28"
      onMouseDown={(e) => {
        // We need this to prevent an event list from closing when user clicks on a button
        e.preventDefault();
      }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {getButtonText()}
    </button>
  );
};
