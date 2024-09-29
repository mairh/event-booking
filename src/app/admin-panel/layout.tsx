import '../globals.css';

import { notFound, redirect } from 'next/navigation';

import { DrawerMenu } from '@/modules/admin-panel';
import { auth } from '@/modules/auth';
import { settings } from '@/modules/common';
import { UserRole } from '@/modules/data';

import { Providers } from '../providers';

export const metadata = {
  title: 'Event Booking | Admin Panel',
  description: 'Admin panel for event booking system',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== UserRole.ADMIN) {
    redirect('/login');
  }

  if (session.user && settings.app.port !== settings.app.adminPort) {
    notFound();
  }

  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          <DrawerMenu>{children}</DrawerMenu>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
