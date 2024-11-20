import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: () => null,
        tabBarBackground: () => null,
        tabBarStyle: { display: 'none' },
      }}>
      <Tabs.Screen
        name="index"
      />
    </Tabs>
  );
}
