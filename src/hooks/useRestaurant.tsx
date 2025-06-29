import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

export function useRestaurant(id: any) {
  const { data: session, status } = useSession();
  const email = session?.user?.email;

  const {
    data: resData,
    isLoading,
    mutate,
  } = useSWR(email ? `/api/restaurant/${email}` : null, fetcher);

  const currRes = useMemo(() => resData?.find((item: any) => item._id == id), [id, resData]);
  return {
    session,
    resData,
    isLoading,
    mutate,
    currRes,
    loadingSession: status === 'loading',
  };
}
