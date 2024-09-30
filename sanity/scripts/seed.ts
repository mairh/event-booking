import { client } from '@/sanity/lib/client';
import initialEvents from './initial-events.json';

export const seed = async () => {
  for (const event of initialEvents) {
    try {
      await client.createIfNotExists({
        _type: 'event',
        _id: event._id,
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        coverImage: event.coverImage,
      });
    } catch (err) {
      console.error('Error on creating/updating event:', err);
    }
  }
};
