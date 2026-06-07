import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppTheme } from '@/theme/tokens';

export function FloatingTabBar({ state, descriptors, navigation, position }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: Math.max(insets.bottom, 20) }]}>
      <View style={styles.contentContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              label={label}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              routeName={route.name}
            />
          );
        })}
      </View>
    </View>
  );
}

const TabItem = ({ label, isFocused, onPress, onLongPress, routeName }: any) => {
  const animatedValue = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: false, // Must be false because we animate backgroundColor and dimensions
      tension: 50,
      friction: 7,
    }).start();
  }, [isFocused]);

  // Interpolations
  const iconTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8], // Lift up by 8 pixels
  });

  const labelOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const pillWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [48, 76], // Expands to a wider chip
  });

  const pillBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', `${AppTheme.colors.primary}33`], // 20% opacity of primary color
  });

  // Determine Icon based on route name and focus
  let iconName: any = 'help-circle';
  if (routeName === 'index') {
    iconName = isFocused ? 'home' : 'home-outline';
  } else if (routeName === 'settings') {
    iconName = isFocused ? 'cog' : 'cog-outline';
  }

  const iconColor = isFocused ? AppTheme.colors.primary : AppTheme.colors.secondary;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabItem}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.pill, { backgroundColor: pillBackgroundColor, width: pillWidth }]}>
        <Animated.View style={{ transform: [{ translateY: iconTranslateY }] }}>
          <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
        </Animated.View>

        {isFocused && (
          <Animated.Text style={[styles.label, { opacity: labelOpacity, color: AppTheme.colors.primary }]}>
            {label}
          </Animated.Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingVertical: 10, // Reduced padding
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    width: '85%', // Reduced width
    justifyContent: 'space-around',
    // @ts-ignore
    cornerCurve: 'continuous',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54, // Reduced height
  },
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    height: 50, // Reduced pill height slightly
    position: 'relative',
    // @ts-ignore
    cornerCurve: 'continuous',
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 2,
  },
});
