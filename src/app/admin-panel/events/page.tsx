import { EventUserList } from '@/modules/admin-panel';

const EventsPage = () => {
  return (
    <div className="w-screen lg:w-[calc(100vw_-_20rem)] flex flex-col overflow-y-auto h-screen py-5 px-0 md:p-5">
      <EventUserList />
    </div>
  );
};

export default EventsPage;
