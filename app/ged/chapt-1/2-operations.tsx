import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/theme-context';

export default function OperationsScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          Whole Number Operations
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Addition</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            Steps for adding large numbers:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• Line up place values</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Start from the right (ones)</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Carry when sum ≥ 10</Text>
          </View>
          <View style={styles.example}>
            <Text style={[styles.exampleText, { color: theme.text }]}>
              {'  '}1{'\n'}
              {'  '}2,364{'\n'}
              + 1,829{'\n'}
              -------{'\n'}
              {'  '}4,193
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Subtraction</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            Steps for subtracting:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• Align numbers vertically</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Start from the right</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Borrow when needed</Text>
          </View>
          <View style={styles.example}>
            <Text style={[styles.exampleText, { color: theme.text }]}>
              {'  '}5,000{'\n'}
              - 3,246{'\n'}
              -------{'\n'}
              {'  '}1,754
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Multiplication</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            Steps to multiply:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• Align right</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Multiply each digit</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Don't forget place holders</Text>
          </View>
          <View style={styles.example}>
            <Text style={[styles.exampleText, { color: theme.text }]}>
              {'   '}234{'\n'}
              {'   '}x 26{'\n'}
              -------{'\n'}
              {'  '}1,404{'\n'}
              {'  '}4,680{'\n'}
              -------{'\n'}
              {'  '}6,084
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Division</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            Long division steps:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• Divide: How many times does 25 go into 600?</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Multiply: 24 × 25 = 600</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Subtract: 600 - 600 = 0</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• No remainder!</Text>
          </View>
          <View style={styles.example}>
            <Text style={[styles.exampleText, { color: theme.text }]}>
              {'      '}24    ← quotient{'\n'}
              25 | 600    ← dividend{'\n'}
              {'    '}500{'\n'}
              {'    '}---{'\n'}
              {'    '}100{'\n'}
              {'    '}100{'\n'}
              {'    '}---{'\n'}
              {'      '}0    ← remainder{'\n'}
            </Text>
          </View>
          <View style={styles.divisionNote}>
            <Text style={[styles.noteText, { color: theme.text }]}>
              600 ÷ 25 = 24 (no remainder)
            </Text>
          </View>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  bulletPoints: {
    paddingLeft: 10,
    marginVertical: 8,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 28,
  },
  example: {
    backgroundColor: 'rgba(128,128,128,0.1)',
    borderRadius: 8,
    padding: 15,
    marginTop: 8,
  },
  exampleText: {
    fontSize: 16,
    fontFamily: 'monospace',
    lineHeight: 28,
  },
  divisionNote: {
    marginTop: 10,
    padding: 8,
    borderLeftWidth: 3,
    borderLeftColor: 'rgba(128,128,128,0.3)',
  },
  noteText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
