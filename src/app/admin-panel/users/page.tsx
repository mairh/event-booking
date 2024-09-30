import { UsersTable } from '@/modules/admin-panel';

const UsersPage = () => {
  return (
    <div className="lg:w-[calc(100vw_-_20rem)] w-full py-5 px-0 md:p-5">
      <UsersTable />
    </div>
  );
};

export default UsersPage;
