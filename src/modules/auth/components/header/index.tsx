import { HeaderTitle, ThemeController } from '@/modules/common';

import { DropdownMenu } from '../dropdown-menu';

export const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <HeaderTitle />
      </div>
      <div className="flex-none">
        <ThemeController />
        <DropdownMenu />
      </div>
    </div>
  );
};
