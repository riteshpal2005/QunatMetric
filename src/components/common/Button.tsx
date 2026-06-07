import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper';
import { colors, spacing } from '@/theme/tokens';

interface ButtonProps extends Omit<PaperButtonProps, 'theme'> {
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Enterprise Button Primitive
 * 
 * A reusable wrapper around react-native-paper's Button.
 * Enforces our app's design system (colors, radiuses, padding).
 */
export const Button: React.FC<ButtonProps> = ({ variant = 'primary', style, ...props }) => {
  const getButtonColor = () => {
    switch (variant) {
      case 'danger': return colors.error;
      case 'secondary': return colors.secondary;
      case 'primary':
      default: return colors.primary;
    }
  };

  return (
    <PaperButton
      mode="contained"
      buttonColor={getButtonColor()}
      textColor={variant === 'secondary' ? colors.background : '#000000'}
      style={[styles.button, style]}
      labelStyle={styles.label}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: spacing.sm,
  },
  label: {
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingVertical: 4,
  },
});
