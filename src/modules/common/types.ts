import { Session } from 'next-auth';

import { Event } from '../event/types';

export type SessionType = {
  data: Session | null;
  status: 'authenticated' | 'loading' | 'unauthenticated';
};

export type SubscriptionUpdate = {
  documentId: string;
  result: Omit<Event, 'id'>;
  transition: 'appear' | 'disappear' | 'update';
};
