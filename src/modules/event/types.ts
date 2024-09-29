export type Event = {
  coverImage: {
    asset: {
      [key: string]: string;
    };
    alt?: string;
  };
  description: string;
  endDate: string;
  id: string;
  location: string;
  startDate: string;
  title: string;
};

export type ScheduleIds = {
  scheduleIds: string[] | null;
};
