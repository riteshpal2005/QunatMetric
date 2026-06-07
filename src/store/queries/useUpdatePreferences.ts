import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userRepositoryImpl } from '@/data/repositories/user.repository.impl';
import { User } from '@/domain/entities/user.entity';

/**
 * Custom Hook: useUpdatePreferences
 * 
 * Unlike `useQuery` (which READS data), `useMutation` is used to WRITE/MODIFY data.
 */
export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences: Partial<User['preferences']>) => {
      return userRepositoryImpl.updatePreferences(preferences);
    },
    
    // This runs automatically if the mutation succeeds!
    onSuccess: (updatedUser) => {
      // 1. We could update our Zustand AuthStore here
      // useAuthStore.getState().setUser(updatedUser);
      
      // 2. Or, we can tell React Query that any cached 'currentUser' data is now stale,
      // forcing it to automatically refetch the user profile on the next render.
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      
      console.log('Preferences updated successfully!');
    },
    onError: (error) => {
      // We could trigger our UI Store here to show a global error banner
      // useUIStore.getState().setGlobalError(error.message);
    }
  });
};
