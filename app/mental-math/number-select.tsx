import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../context/theme-context';

export default function NumberSelectScreen() {
  const router = useRouter();
  const { operation } = useLocalSearchParams();
  const { theme } = useTheme();

  const numbers = Array.from({ length: 13 }, (_, i) => i);

  const handleNumberSelect = (number: number) => {
    router.push({
      pathname: '/mental-math/mental-math-settings',
      params: { operation, firstNumber: number }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Select First Operand</Text>
      <Text style={[styles.operation, { color: theme.text }]}>Operation: {operation}</Text>
      <View style={styles.numberGrid}>
        {numbers.map((num) => (
          <Pressable
            key={num}
            style={[styles.numberButton, { backgroundColor: theme.surface }]}
            onPress={() => handleNumberSelect(num)}
          >
            <Text style={[styles.numberText, { color: theme.text }]}>{num}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  numberButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  numberText: {
    fontSize: 24,
  },
  operation: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
