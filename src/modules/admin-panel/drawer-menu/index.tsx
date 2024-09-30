/* eslint-disable jsx-a11y/control-has-associated-label -- This is disabled to align with the examples provided in the official documentation */
/* eslint-disable jsx-a11y/label-has-associated-control -- This is disabled to align with the examples provided in the official documentation */

'use client';

import { ColorWheelIcon, MenuIcon } from '@sanity/icons';
import { PropsWithChildren, useRef } from 'react';

import { HeaderTitle, ThemeController } from '@/modules/common';

import { EventsButton, LogoutButton, UsersButton } from '../buttons';
import { ButtonWrapper } from '../buttons/button-wrapper';

export const DrawerMenu = (props: PropsWithChildren) => {
  const { children } = props;
  const checkboxRef = useRef(null);

  return (
    <div className="drawer lg:drawer-open flex lg:flex-col">
      <input
        id="drawer-menu"
        type="checkbox"
        ref={checkboxRef}
        className="drawer-toggle"
      />
      <div className="drawer-content flex max-lg:flex-col items-center w-full lg:items-start justify-center lg:justify-start">
        <div className="flex bg-base-200 lg:bg-transparent w-full lg:w-auto p-4 lg:p-0 items-center">
          <label htmlFor="drawer-menu" className="lg:hidden">
            <MenuIcon width={40} height={40} />
          </label>
          <HeaderTitle isAdminPanel />
        </div>
        <div className="flex w-full lg:w-auto">
          <div className="lg:h-screen lg:absolute lg:z-10 w-full lg:w-auto overflow-y-hidden">
            {children}
          </div>
        </div>
      </div>
      <div className="drawer-side h-screen lg:h-auto">
        <label
          htmlFor="drawer-menu"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu bg-base-200 text-base-content min-h-full lg:h-[calc(100vh-10.7rem)] w-80 px-4 pb-4 pt-8 gap-2 lg:pt-0">
          <li>
            <UsersButton checkboxRef={checkboxRef} />
          </li>
          <li>
            <EventsButton checkboxRef={checkboxRef} />
          </li>
          <div className="divider py-4" />
          <li>
            <LogoutButton />
          </li>
          <div className="divider py-4" />
          <li>
            <ButtonWrapper>
              <ColorWheelIcon width={30} height={30} />
              <ThemeController />
            </ButtonWrapper>
          </li>
        </ul>
      </div>
    </div>
  );
};
