import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { UserPageContentProps } from './types';

export const useLogic = (params: UserPageContentProps) => {
  const { userId } = params;

  const [scheduleIds, setScheduleIds] = useState<string[] | null>(null);
  const session = useSession();

  useEffect(() => {
    if (session.status === 'loading') {
      return;
    }

    const fetchScheduleIds = async () => {
      const res = await fetch('/api/scheduleIds', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId ?? session.data?.user.id,
        }),
      });

      const data = await res.json();

      setScheduleIds(data.scheduleIds);
    };

    void fetchScheduleIds();
  }, [session]);

  return {
    scheduleIds,
  };
};
