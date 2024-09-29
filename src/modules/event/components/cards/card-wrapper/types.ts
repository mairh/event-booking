import { PropsWithChildren } from 'react';

import { Event } from '@/modules/event/types';

export type CardWrapperProps = {
  event: Event;
} & PropsWithChildren;
