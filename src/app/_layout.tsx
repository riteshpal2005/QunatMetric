import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ThemeProvider, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

// Providers and Config
import { queryClient, queryClientPersister } from '@/utils/query.config';
import { AppTheme } from '@/theme/tokens';
import '@/utils/i18n.config';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';

const CustomNavigationTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: AppTheme.colors.primary,
    background: AppTheme.colors.background,
    card: AppTheme.colors.surface,
    text: AppTheme.colors.secondary,
    border: AppTheme.colors.accent,
    notification: AppTheme.colors.error,
  },
};

export default function RootLayout() {
  return (
    <PersistQueryClientProvider 
      client={queryClient}
      persistOptions={{ persister: queryClientPersister }}
    >
      <PaperProvider theme={AppTheme}>
        <ThemeProvider value={CustomNavigationTheme}>
          <ErrorBoundary>
            <Stack screenOptions={{ headerShown: false }} />
          </ErrorBoundary>
        </ThemeProvider>
      </PaperProvider>
    </PersistQueryClientProvider>
  );
}
