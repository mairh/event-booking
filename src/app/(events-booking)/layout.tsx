import '../globals.css';

import { Providers } from '../providers';

export const metadata = {
  title: 'Event Booking',
  description: 'Event booking system',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
