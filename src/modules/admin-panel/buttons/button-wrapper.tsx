'use client';

import { PropsWithChildren } from 'react';

export type ButtonWrapperProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & PropsWithChildren;

export const ButtonWrapper = (props: ButtonWrapperProps) => {
  const { children, onClick } = props;

  return (
    <button
      className="btn btn-ghost flex justify-start w-full p-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
