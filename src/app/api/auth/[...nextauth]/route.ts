import NextAuth from 'next-auth';

import { authOptions } from '@/modules/auth';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- This is disabled to align with the examples provided in the official documentation
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
