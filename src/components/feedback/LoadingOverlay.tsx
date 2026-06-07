import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { colors, spacing } from '@/theme/tokens';

interface LoadingOverlayProps {
  message?: string;
}

/**
 * A reusable loading overlay that can be placed over any screen.
 * It uses our Solo Leveling primary neon cyan color for the spinner.
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Awakening System...' }) => {
  return (
    <View style={styles.container}>
      {/* 
        We use React Native Paper's ActivityIndicator, 
        and color it with our custom theme token! 
      */}
      <ActivityIndicator animating={true} color={colors.primary} size="large" />
      
      {/* 
        A subtle message below the spinner, using our secondary silver text color 
      */}
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Fills the entire screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 12, 16, 0.85)', // A semi-transparent dark void background
    zIndex: 999, // Ensures it sits on top of everything else
  },
  text: {
    marginTop: spacing.md,
    color: colors.secondary,
    fontWeight: '500',
    letterSpacing: 1, // Gives it a slightly futuristic/system feel
  },
});
