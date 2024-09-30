import { notFound, redirect } from 'next/navigation';

import { auth } from '@/modules/auth';
import { settings, UserPageContent } from '@/modules/common';

const HomePage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  if (session.user && settings.app.port === settings.app.adminPort) {
    notFound();
  }

  return <UserPageContent hasHeader />;
};

export default HomePage;
