import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

import { useFetchMetrics } from '@/store/queries/useFetchMetrics';
import { MetricCard } from './components/MetricCard';
import { PreferencesMenu } from '@/components/navigation/PreferencesMenu';
import { LoadingOverlay } from '../../components/feedback/LoadingOverlay';
import { colors, spacing } from '@/theme/tokens';

export const DashboardScreen: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  
  // Magic happens here! We call our Hook to get data, loading state, and errors.
  const { data: cryptoAssets, isLoading, isError, refetch } = useFetchMetrics(20);

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{t('errors.network')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading && <LoadingOverlay message="Synchronizing System..." />}
      
      {/* Title Bar with Preferences Menu */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{t('dashboard.title')}</Text>
          <Text style={styles.subtitle}>{t('dashboard.metrics')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton 
            icon="account-circle" 
            iconColor={colors.primary} 
            size={24} 
            onPress={() => router.push('/profile')} 
          />
          <PreferencesMenu />
        </View>
      </View>

      {/* 
        FlatList is highly optimized for scrolling long lists in React Native.
        Instead of rendering all 20 cards at once, it only renders the ones on screen!
      */}
      <FlatList
        data={cryptoAssets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MetricCard asset={item} />}
        contentContainerStyle={styles.listContent}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Deep dark void background
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xxl, // Extra padding for status bar area
    paddingBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary, // Neon cyan
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondary, // Silver text
    marginTop: spacing.xs,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
  },
});
