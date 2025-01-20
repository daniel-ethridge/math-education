import { Stack } from 'expo-router';
import { Alert } from 'react-native';
import { ThemeProvider } from './context/theme-context';
import { router } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenListeners={{
          beforeRemove: (e) => {
            if (e.target?.includes('mental-math-game')) {
              e.preventDefault();
              Alert.alert(
                'Exit Game',
                'Are you sure you want to exit? Your progress will be lost.',
                [
                  { text: 'Cancel', style: 'cancel', onPress: () => {} },
                  { 
                    text: 'Exit', 
                    style: 'destructive', 
                    onPress: () => {
                      // Navigate back to the Mental Math main screen
                      router.push('/(tabs)/mental-math');
                    }
                  },
                ]
              );
            }
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="mental-math/number-select"
          options={{
            presentation: 'card',
            title: 'Select Number',
          }}
        />
        <Stack.Screen
          name="mental-math/mental-math-settings"
          options={{
            presentation: 'card',
            title: 'Game Settings',
          }}
        />
        <Stack.Screen
          name="mental-math/mental-math-game"
          options={{
            presentation: 'card',
            title: 'Mental Math Game',
          }}
        />
        <Stack.Screen
          name="app-settings/app-settings"
          options={{
            presentation: 'card',
            title: 'App Settings',
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
