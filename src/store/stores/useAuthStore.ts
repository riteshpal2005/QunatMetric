import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/domain/entities/user.entity';
import { zustandAsyncStorageAdapter } from '@/utils/storage.config';

/**
 * Zustand is our Global Client-State manager.
 * Think of this as a global "bulletin board" for authentication.
 * Any screen or component in our app can read from or write to this board instantly,
 * without having to pass data down through a hundred React props.
 */
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions to update the state
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // The unique key for MMKV
      storage: createJSONStorage(() => zustandAsyncStorageAdapter), // Plug in our ultra-fast C++ adapter
    }
  )
);
