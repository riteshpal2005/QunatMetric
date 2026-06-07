import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppTheme } from '@/theme/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloatingTabBar } from '@/components/navigation/FloatingTabBar';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        swipeEnabled: true,
      }}
    >
      <MaterialTopTabs.Screen 
        name="index" 
        options={{ title: 'Home' }} 
      />
      <MaterialTopTabs.Screen 
        name="settings" 
        options={{ title: 'Settings' }} 
      />
    </MaterialTopTabs>
  );
}
