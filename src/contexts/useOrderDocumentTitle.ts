import { useEffect } from 'react';
import { useOrder } from './OrderContext';

export function useOrderDocumentTitle(watchListCount: number) {
  const { members } = useOrder();
  const onlineMembersCount = members.filter((m: { status: string }) => m.status === 'online').length;

  useEffect(() => {
    document.title = `(${onlineMembersCount} - ${watchListCount}) Order`;
  }, [onlineMembersCount, watchListCount]);
}
