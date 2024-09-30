const JWT_TOKEN_MAX_AGE = Number(
  process.env.NEXT_PUBLIC_JWT_TOKEN_MAX_AGE as string,
);

// cspell:ignore NEXTAUTH
const JWT_TOKEN_SECRET = process.env.NEXTAUTH_SECRET as string;

const REDIS_HOST = process.env.NEXT_PUBLIC_REDIS_HOST || '127.0.0.1';
const REDIS_PORT = Number(process.env.NEXT_PUBLIC_REDIS_PORT as string);

const APP_PORT = process.env.NEXT_PUBLIC_PORT as string;
const ADMIN_PORT = process.env.NEXT_PUBLIC_ADMIN_PORT as string;

export const USER_EVENTS_CHANNEL = 'UserEvents';

export const settings = {
  jwt: {
    maxAge: JWT_TOKEN_MAX_AGE,
    secret: JWT_TOKEN_SECRET,
  },
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
  app: {
    port: APP_PORT,
    adminPort: ADMIN_PORT,
  },
};
