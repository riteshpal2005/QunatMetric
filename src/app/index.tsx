import React from 'react';
import { DashboardScreen } from '@/screens/dashboard/DashboardScreen';
import { Stack } from 'expo-router';

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <DashboardScreen />
    </>
  );
}
