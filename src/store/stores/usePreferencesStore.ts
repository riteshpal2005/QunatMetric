import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandAsyncStorageAdapter } from '@/utils/storage.config';
import i18n from '@/utils/i18n.config';

interface PreferencesState {
  currency: string;
  language: string;
  
  setCurrency: (currency: string) => void;
  setLanguage: (language: string) => void;
}

/**
 * Preferences Store
 * Manages global user settings like Language and Currency.
 * Persisted synchronously using MMKV.
 */
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      currency: 'inr', // Mandatory default
      language: 'en', // Default language
      
      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => {
        // Change the i18next language immediately
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'preferences-storage', // MMKV key
      storage: createJSONStorage(() => zustandAsyncStorageAdapter),
    }
  )
);
