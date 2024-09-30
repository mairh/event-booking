import { redirect } from 'next/navigation';

import { UserPageContent } from '@/modules/common';

const UserPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { username: string };
}) => {
  if (!searchParams.username) {
    return redirect('/admin-panel/users'); // Ensure return here to stop further execution
  }

  return (
    <div className="w-screen lg:w-[calc(100vw_-_20rem)] flex flex-col overflow-hidden lg:h-screen">
      <div className="px-4 py-12 mt-1 sm:px-6">
        <h3 className="text-[1.7rem] sm:text-3xl font-semibold ml-3 sm:ml-0">
          Managing events for {searchParams.username}
        </h3>
      </div>
      <div className="overflow-y-auto">
        <UserPageContent userId={params.id} isAdminPanel />
      </div>
    </div>
  );
};

export default UserPage;
