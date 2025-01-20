import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/theme-context';

export default function SlopeOfLineScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Slope of a Line</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Coming soon: Lesson content about calculating and understanding slope will be added here.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  text: { fontSize: 16, lineHeight: 24 },
});
