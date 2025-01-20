import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { useTheme } from '../context/theme-context';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const topics = [
    'Number Sense and Problem Solving',
    'Decimals and Fractions',
    'Ratio, Proportion, and Percent',
    'Data, Statistics, and Probability',
    'Algebra Basics, Expressions, and Polynomials',
    'Equations, Inequalities, and Functions',
    'Geometry'
  ];

  const handlePress = (topic: string) => {
    Alert.alert('Coming Soon', `${topic} practice will be available soon!`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>GED Mathematics</Text>
        <View style={styles.buttonContainer}>
          {topics.map((topic, index) => (
            <Pressable
              key={topic}
              style={[styles.button, { backgroundColor: theme.surface }]}
              onPress={() => handlePress(topic)}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>
                {index + 1} - {topic}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'left',
  },
});
