import { redirect } from 'next/navigation';

import { auth, LoginForm } from '@/modules/auth';
import { settings } from '@/modules/common';
import { UserRole } from '@/modules/data/types';

const LoginPage = async () => {
  // Need to use custom auth() function instead of getServerSession() from 'next-auth' to get the correct user data.
  const session = await auth();

  if (session && session?.user) {
    if (settings.app.port !== settings.app.adminPort) {
      redirect('/home');
    }

    if (
      settings.app.port === settings.app.adminPort &&
      session.user.role === UserRole.ADMIN
    ) {
      redirect('/admin-panel/users');
    }
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
