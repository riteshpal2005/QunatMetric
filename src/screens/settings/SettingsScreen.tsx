import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Surface, Divider, Menu, IconButton } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { userRepositoryImpl } from '@/data/repositories/user.repository.impl';
import { useCryptoForm } from '@/hooks/useCryptoForm';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { LoadingOverlay } from '@/components/feedback/LoadingOverlay';
import { colors, spacing } from '@/theme/tokens';
import { useUpdatePreferences } from '@/store/queries/useUpdatePreferences';
import { usePreferencesStore } from '@/store/stores/usePreferencesStore';

const LANGUAGES = [
  { code: 'en', label: 'English 🇺🇸' },
  { code: 'es', label: 'Español 🇪🇸' },
  { code: 'zh', label: '中文 🇨🇳' },
  { code: 'ja', label: '日本語 🇯🇵' },
  { code: 'ru', label: 'Русский 🇷🇺' },
  { code: 'de', label: 'Deutsch 🇩🇪' },
  { code: 'hi', label: 'हिन्दी 🇮🇳' },
];

const CURRENCIES = [
  { code: 'inr', label: '₹ INR' },
  { code: 'usd', label: '$ USD' },
  { code: 'eur', label: '€ EUR' },
  { code: 'gbp', label: '£ GBP' },
  { code: 'jpy', label: '¥ JPY' },
  { code: 'cny', label: '¥ CNY' },
];

export const SettingsScreen: React.FC = () => {
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => userRepositoryImpl.getCurrentUser(),
  });

  const { control, handleSubmit, formState: { errors } } = useCryptoForm();
  const { mutate: updatePrefs, isPending: isUpdating } = useUpdatePreferences();

  const { language, currency, setLanguage, setCurrency } = usePreferencesStore();
  const [langVisible, setLangVisible] = useState(false);
  const [currVisible, setCurrVisible] = useState(false);

  const onSubmitAlert = (data: any) => {
    updatePrefs({ theme: 'dark' }); 
  };

  if (isUserLoading || !user) {
    return <LoadingOverlay message="Loading Settings Data..." />;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {isUpdating && <LoadingOverlay message="Saving to Server..." />}
        
        {/* Profile Card */}
        <Surface style={styles.card} elevation={2}>
          <Text style={styles.title}>Hunter Profile</Text>
          <Text style={styles.subtitle}>ID: {user.id}</Text>
          <Divider style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{user.username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </Surface>

        {/* Global Preferences */}
        <Surface style={styles.card} elevation={2}>
          <Text style={styles.title}>Global Preferences</Text>
          <Text style={styles.subtitle}>Language & Currency</Text>
          
          <View style={[styles.row, { marginTop: spacing.md }]}>
            <Text style={styles.label}>Currency:</Text>
            <Menu
              visible={currVisible}
              onDismiss={() => setCurrVisible(false)}
              anchor={
                <View style={styles.pillBtn}>
                  <Text style={styles.pillText}>{currency.toUpperCase()}</Text>
                  <IconButton icon="cash" size={20} iconColor={colors.primary} onPress={() => setCurrVisible(true)} />
                </View>
              }
            >
              {CURRENCIES.map((cur) => (
                <Menu.Item
                  key={cur.code}
                  onPress={() => { setCurrency(cur.code); setCurrVisible(false); }}
                  title={cur.label}
                  titleStyle={currency === cur.code ? styles.activeText : styles.inactiveText}
                />
              ))}
            </Menu>
          </View>

          <View style={[styles.row, { marginTop: spacing.md }]}>
            <Text style={styles.label}>Language:</Text>
            <Menu
              visible={langVisible}
              onDismiss={() => setLangVisible(false)}
              anchor={
                <View style={styles.pillBtn}>
                  <Text style={styles.pillText}>{language.toUpperCase()}</Text>
                  <IconButton icon="translate" size={20} iconColor={colors.primary} onPress={() => setLangVisible(true)} />
                </View>
              }
            >
              {LANGUAGES.map((lang) => (
                <Menu.Item
                  key={lang.code}
                  onPress={() => { setLanguage(lang.code); setLangVisible(false); }}
                  title={lang.label}
                  titleStyle={language === lang.code ? styles.activeText : styles.inactiveText}
                />
              ))}
            </Menu>
          </View>
        </Surface>

        {/* Demo Form: Price Alert Setup */}
        <Surface style={styles.card} elevation={2}>
          <Text style={styles.title}>Set Price Alert</Text>
          <Text style={styles.subtitle}>Powered by React Hook Form + Zod</Text>
          <Controller
            control={control}
            name="targetPrice"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Target Price ($)"
                placeholder="e.g. 50000"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
                errorMsg={errors.targetPrice?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="alertType"
            render={({ field: { onChange, value } }) => (
              <View style={styles.row}>
                <Button variant={value === 'above' ? 'primary' : 'secondary'} onPress={() => onChange('above')} style={{ flex: 1, marginRight: 4 }}>Goes Above</Button>
                <Button variant={value === 'below' ? 'primary' : 'secondary'} onPress={() => onChange('below')} style={{ flex: 1, marginLeft: 4 }}>Drops Below</Button>
              </View>
            )}
          />
          <Button variant="primary" onPress={handleSubmit(onSubmitAlert)} style={{ marginTop: 16 }} disabled={isUpdating}>
            Create Alert
          </Button>
        </Surface>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { 
    padding: spacing.md, 
    paddingTop: spacing.xxl,
    paddingBottom: 140, // Account for floating tab bar 
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.primary },
  subtitle: { fontSize: 14, color: colors.secondary, marginBottom: 16 },
  divider: { backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4, alignItems: 'center' },
  label: { color: colors.secondary, fontSize: 16 },
  value: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  pillBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 16, paddingLeft: 12 },
  pillText: { color: colors.secondary, fontWeight: 'bold' },
  activeText: { color: colors.primary, fontWeight: 'bold' },
  inactiveText: { color: colors.secondary }
});
