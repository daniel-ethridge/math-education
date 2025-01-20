import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../context/theme-context';
import { useRouter } from 'expo-router';

export default function EquationsScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const lessons = [
    'Lesson 1: Equations',
    'Lesson 2: Equation Word Problems',
    'Lesson 3: Inequalities',
    'Lesson 4: Quadratic Equations',
    'Lesson 5: Algebra Problem Solving',
    'Lesson 6: The Coordinate Plane',
    'Lesson 7: Graphing a Line',
    'Lesson 8: Slope of a Line',
    'Lesson 9: Slope and Equations',
    'Lesson 10: Systems of Linear Equations',
    'Lesson 11: Patterns and Functions',
    'Lesson 12: Function Applications',
    'Lesson 13: Function Notation'
  ];

  const handlePress = (lesson: string) => {
    if (lesson === 'Lesson 6: The Coordinate Plane') {
      router.push('/ged/chapt-6/6-coordinate-plane');
    } else if (lesson === 'Lesson 7: Graphing a Line') {
      router.push('/ged/chapt-6/7-graphing-line');
    } else if (lesson === 'Lesson 8: Slope of a Line') {
      router.push('/ged/chapt-6/8-slope-of-line');
    } else {
      console.log(`Selected: ${lesson}`);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          Equations, Inequalities, and Functions
        </Text>
        <View style={styles.buttonContainer}>
          {lessons.map((lesson) => (
            <Pressable
              key={lesson}
              style={[styles.button, { backgroundColor: theme.surface }]}
              onPress={() => handlePress(lesson)}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>{lesson}</Text>
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
    fontWeight: 'bold',
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
