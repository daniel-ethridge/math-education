import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/theme-context';

export default function SettingsStatsScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const handlePress = (feature: string) => {
    if (feature === 'Settings') {
      router.push('/app-settings/app-settings');
    } else {
      Alert.alert('Coming Soon', `${feature} will be available soon!`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, { backgroundColor: theme.surface }]}
          onPress={() => handlePress('Settings')}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Settings</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, { backgroundColor: theme.surface }]}
          onPress={() => handlePress('Statistics')}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Statistics</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
