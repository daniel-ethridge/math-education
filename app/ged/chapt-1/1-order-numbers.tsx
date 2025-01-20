import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/theme-context';

export default function OrderNumbersScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          Compare and Order Numbers
        </Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Place Value
          </Text>
          <Text style={[styles.text, { color: theme.text }]}>
            Each digit's position gives it a specific value:
          </Text>
          <View style={styles.placeValueContainer}>
            <Text style={[styles.placeValue, { color: theme.text }]}>Millions: 1,000,000</Text>
            <Text style={[styles.placeValue, { color: theme.text }]}>Hundred Thousands: 100,000</Text>
            <Text style={[styles.placeValue, { color: theme.text }]}>Ten Thousands: 10,000</Text>
            <Text style={[styles.placeValue, { color: theme.text }]}>Thousands: 1,000</Text>
            <Text style={[styles.placeValue, { color: theme.text }]}>Hundreds: 100</Text>
            <Text style={[styles.placeValue, { color: theme.text }]}>Tens: 10</Text>
            <Text style={[styles.placeValue, { color: theme.text }]}>Ones: 1</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Comparing Numbers
          </Text>
          <Text style={[styles.subTitle, { color: theme.text }]}>
            Follow these steps:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• Line up place values</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Compare from left to right</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Find first different digit</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Larger digit = larger number</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Rounding Numbers
          </Text>
          <Text style={[styles.subTitle, { color: theme.text }]}>
            Basic Rules:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• 5 or more: round up</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• 4 or less: round down</Text>
          </View>
          
          <Text style={[styles.subTitle, { color: theme.text, marginTop: 15 }]}>
            Example:
          </Text>
          <View style={styles.example}>
            <Text style={[styles.exampleText, { color: theme.text }]}>
              3,678 → nearest hundred{'\n'}
              Look at tens digit (7){'\n'}
              7 {'>'} 5, so round up{'\n'}
              Answer: 3,700
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
    marginBottom: 25,
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
  placeValueContainer: {
    marginVertical: 10,
  },
  placeValue: {
    fontSize: 16,
    paddingVertical: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 8,
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
    fontSize: 16,
    fontFamily: 'monospace',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  exampleText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
