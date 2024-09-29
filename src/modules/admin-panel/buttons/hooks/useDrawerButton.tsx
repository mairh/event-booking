import { useRouter } from 'next/navigation';

import { DrawerButtonProps } from '../types';

export const useDrawerButton = (params: DrawerButtonProps) => {
  const { checkboxRef } = params;
  const route = useRouter();

  const closeDrawer = () => {
    if (checkboxRef.current?.checked) {
      checkboxRef.current.checked = false;
    }
  };

  const usersClickHandler = () => {
    closeDrawer();
    route.push('/admin-panel/users');
  };

  const eventsClickHandler = () => {
    closeDrawer();
    route.push('/admin-panel/events');
  };

  return {
    usersClickHandler,
    eventsClickHandler,
  };
};
