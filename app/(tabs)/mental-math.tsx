import { Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/theme-context';

export default function MentalMathScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const handleOperationSelect = (operation: string) => {
    if (operation === 'Squares and Square Roots') {
      router.push({
        pathname: '/mental-math/mental-math-settings',
        params: { operation }
      });
      return;
    }
    router.push({
      pathname: '/mental-math/number-select',
      params: { operation }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>Choose an Operation</Text>
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, { backgroundColor: theme.surface }]}
          onPress={() => handleOperationSelect('Addition')}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Addition</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, { backgroundColor: theme.surface }]}
          onPress={() => handleOperationSelect('Subtraction')}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Subtraction</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, { backgroundColor: theme.surface }]}
          onPress={() => handleOperationSelect('Multiplication')}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Multiplication</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, { backgroundColor: theme.surface }]}
          onPress={() => handleOperationSelect('Division')}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Division</Text>
        </Pressable>
        <Pressable 
          style={[styles.button, { backgroundColor: theme.surface }]}
          onPress={() => handleOperationSelect('Squares and Square Roots')}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>Squares and Square Roots</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    gap: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
