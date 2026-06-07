import { useQuery } from '@tanstack/react-query';
import { cryptoRepositoryImpl } from '@/data/repositories/crypto.repository.impl';
import { usePreferencesStore } from '../stores/usePreferencesStore';

/**
 * Custom Hook: useFetchMetrics
 * 
 * This is the magic bridge between React and our Backend Protocol!
 * Any UI Component can call `const { data, isLoading } = useFetchMetrics();`
 * 
 * It automatically handles:
 * 1. Caching (from our query.config.ts)
 * 2. Background refetching
 * 3. Loading and Error states
 */
export const useFetchMetrics = (limit: number = 20) => {
  const currency = usePreferencesStore((state) => state.currency);

  return useQuery({
    // The "Query Key" is how React Query identifies this specific piece of data in its memory bank.
    // By adding `currency` to the key, changing currency automatically triggers a new fetch and caches it separately!
    queryKey: ['topAssets', limit, currency],
    
    // The "Query Function" is the actual promise that fetches the data.
    // Notice how clean this is? We just call our conductor (the repository).
    queryFn: () => cryptoRepositoryImpl.getTopAssets(limit, currency),
  });
};
