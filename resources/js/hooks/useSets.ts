import { getSet, getSets } from '@/apis';
import { useQuery } from '@tanstack/react-query';

export function useSets() {
  return useQuery({
    queryKey: ['sets'],
    queryFn: getSets,
    staleTime: 24 * 60 * 60 * 1000,
  });
}

// https://github.com/destinio/poke-cards/blob/main/src/api/seachCards.ts
export function useSet(id: string) {
  return useQuery({
    queryKey: ['set', id],
    queryFn: async () => getSet(id),
    staleTime: 24 * 60 * 60 * 1000,
  });
}

export function useCard(setId: string, cardId: string) {
  const { data, isLoading, isFetching, error } = useSet(setId);

  const card = data?.find((card) => card.id === cardId);

  const loading = isLoading || isFetching;

  return { card, isLoading, loading, error };
}
