import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/context/ThemeContext';
import { TaskProvider } from './src/context/TaskContext';
import DashboardScreen from './src/screens/DashboardScreen';
import DetailScreen from './src/screens/DetailScreen';
import { useContext } from 'react';
import { ThemeContext } from './src/context/ThemeContext';
import HeaderAction from './src/components/HeaderAction';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isDarkMode, themeReady, colors } = useContext(ThemeContext);
  if (!themeReady) return null;
  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.brand2 },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.bg },
          headerRight: () => <HeaderAction />,
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Task & Habit Tracker' }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Task' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}
