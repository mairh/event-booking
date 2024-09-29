import { HeaderTitleProps } from './types';

export const HeaderTitle = (props: HeaderTitleProps) => {
  const { isAdminPanel = false } = props;

  return (
    <div>
      {!isAdminPanel ? (
        <div className="flex flex-col items-start">
          <h1 className="text-2xl px-4">Event Booking App</h1>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-0 lg:w-80 lg:bg-base-200 lg:pt-14">
          <h1 className="text-2xl px-8">Admin Panel</h1>
          <div className="hidden lg:divider py-6 px-4" />
        </div>
      )}
    </div>
  );
};
