import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../context/theme-context';
import { useRouter } from 'expo-router';

export default function NumSenseScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const lessons = [
    'Lesson 1: Compare and Order Numbers',
    'Lesson 2: Whole Number Operations',
    'Lesson 3: GED® Test Calculator Skills',
    'Lesson 4: Word Problems',
    'Lesson 5: Distance and Cost'
  ];

  const handlePress = (lesson: string) => {
    if (lesson === 'Lesson 1: Compare and Order Numbers') {
      router.push('/ged/chapt-1/1-order-numbers');
    } else if (lesson === 'Lesson 2: Whole Number Operations') {
      router.push('/ged/chapt-1/2-operations');
    } else {
      console.log(`Selected: ${lesson}`);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Number Sense and Problem Solving</Text>
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
