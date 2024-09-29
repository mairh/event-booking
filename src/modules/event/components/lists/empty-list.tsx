import { PropsWithChildren } from 'react';

export const EmptyList = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="flex flex-col collapse-content items-center">
      <p className="my-12">{children}</p>
    </div>
  );
};
