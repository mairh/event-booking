import { defineQuery } from 'next-sanity';

export const eventsQuery = defineQuery('*[ _type == "event" ]');

export const scheduleQuery = defineQuery(
  '*[_type == "event" && _id in $eventIds]',
);
