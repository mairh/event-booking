/* eslint-disable no-restricted-exports -- This is disabled to align with the examples provided in the official documentation  */

export { default } from 'next-auth/middleware';

export const config = { matcher: ['/home', '/admin-panel'] };
