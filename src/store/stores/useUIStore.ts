import { create } from 'zustand';

/**
 * UI Store
 * This global bulletin board is specifically for temporary visual states.
 * For example, if a background process wants to trigger a full-screen loading spinner
 * without being directly connected to the current screen component.
 */
interface UIState {
  isGlobalLoading: boolean;
  globalError: string | null;
  
  // Actions
  setGlobalLoading: (isLoading: boolean) => void;
  setGlobalError: (error: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isGlobalLoading: false,
  globalError: null,
  
  setGlobalLoading: (isLoading) => set({ isGlobalLoading: isLoading }),
  setGlobalError: (error) => set({ globalError: error }),
}));
