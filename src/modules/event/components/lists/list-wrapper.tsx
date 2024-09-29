// cspell:ignore noninteractive
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- This is disabled to align with the examples provided in the official documentation */

import { ListWrapperProps } from './types';

export const ListWrapper = (props: ListWrapperProps) => {
  const { listTitle, children } = props;

  return (
    <div
      tabIndex={0}
      className="collapse max-md:collapse-arrow border m-2.5 w-auto md:collapse-open"
    >
      <div className="collapse-title text-xl font-bold">{listTitle}</div>
      {children}
    </div>
  );
};
