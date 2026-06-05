import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { EaseView } from 'react-native-ease';

interface EaseAnimationProps {
  children: React.ReactNode;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  duration?: number;
}

/**
 * A basic wrapper for react-native-ease.
 * Offloads animations completely to the native UI thread.
 */
export function EaseAnimation({ 
  children, 
  visible = true, 
  style, 
  duration = 300 
}: EaseAnimationProps) {
  return (
    <EaseView 
      animate={{ opacity: visible ? 1 : 0 }} 
      transition={{ type: 'timing', duration }} 
      style={style}
    >
      {children}
    </EaseView>
  );
}
