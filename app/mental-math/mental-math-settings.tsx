import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Switch, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../context/theme-context';

export default function MentalMathSettingsScreen() {
  const router = useRouter();
  const { operation, firstNumber, minNumber: initMin, maxNumber: initMax, isTimedMode: initTimed, timeOrQuestions: initTimeQuestions, problemType: initType } = useLocalSearchParams();
  const { theme } = useTheme();

  const [minNumber, setMinNumber] = useState(initMin?.toString() || '0');
  const [maxNumber, setMaxNumber] = useState(initMax?.toString() || '12');
  const [isTimedMode, setIsTimedMode] = useState(initTimed ? initTimed === 'true' : true);
  const [timeOrQuestions, setTimeOrQuestions] = useState(initTimeQuestions?.toString() || '5');
  const [problemType, setProblemType] = useState(initType?.toString() || 'squares');
  const [allowNegatives, setAllowNegatives] = useState(false);

  const handleStartGame = () => {
    router.push({
      pathname: '/mental-math/mental-math-game',
      params: {
        operation,
        firstNumber: Number(firstNumber),
        minNumber: parseInt(minNumber),
        maxNumber: parseInt(maxNumber),
        isTimedMode: isTimedMode.toString(), // Convert boolean to string
        timeOrQuestions: parseInt(timeOrQuestions),
        problemType, // Add this to params
        allowNegatives: allowNegatives.toString(),
      }
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Game Settings</Text>
        <Text style={[styles.operation, { color: theme.text }]}>Operation: {operation}</Text>
        
        {operation === 'Squares and Square Roots' && (
          <View style={[styles.radioContainer, { backgroundColor: theme.surface }]}>
            <Pressable 
              style={[styles.radioButton, problemType === 'squares' && styles.radioButtonSelected]} 
              onPress={() => setProblemType('squares')}
            >
              <View style={[styles.radio, { borderColor: theme.text }]}>
                {problemType === 'squares' && (
                  <View style={[styles.radioSelected, { backgroundColor: theme.primary }]} />
                )}
              </View>
              <Text style={[styles.radioText, { color: theme.text }]}>Squares Only</Text>
            </Pressable>

            <Pressable 
              style={[styles.radioButton, problemType === 'roots' && styles.radioButtonSelected]} 
              onPress={() => setProblemType('roots')}
            >
              <View style={[styles.radio, { borderColor: theme.text }]}>
                {problemType === 'roots' && (
                  <View style={[styles.radioSelected, { backgroundColor: theme.primary }]} />
                )}
              </View>
              <Text style={[styles.radioText, { color: theme.text }]}>Square Roots Only</Text>
            </Pressable>

            <Pressable 
              style={[styles.radioButton, problemType === 'both' && styles.radioButtonSelected]} 
              onPress={() => setProblemType('both')}
            >
              <View style={[styles.radio, { borderColor: theme.text }]}>
                {problemType === 'both' && (
                  <View style={[styles.radioSelected, { backgroundColor: theme.primary }]} />
                )}
              </View>
              <Text style={[styles.radioText, { color: theme.text }]}>Both</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            {operation === 'Squares and Square Roots' ? 'Operand Minimum:' : 'Second Operand Minimum:'}
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, color: theme.text }]}
            value={minNumber}
            onChangeText={setMinNumber}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            {operation === 'Squares and Square Roots' ? 'Operand Maximum:' : 'Second Operand Maximum:'}
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, color: theme.text }]}
            value={maxNumber}
            onChangeText={setMaxNumber}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.modeContainer}>
          <Pressable
            style={[styles.modeButton, isTimedMode && styles.selectedMode, { backgroundColor: theme.surface }]}
            onPress={() => setIsTimedMode(true)}
          >
            <Text style={[styles.modeText, { color: theme.text }]}>Timed Mode</Text>
          </Pressable>
          <Pressable
            style={[styles.modeButton, !isTimedMode && styles.selectedMode, { backgroundColor: theme.surface }]}
            onPress={() => setIsTimedMode(false)}
          >
            <Text style={[styles.modeText, { color: theme.text }]}>Question Mode</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            {isTimedMode ? 'Minutes:' : 'Number of Questions:'}
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, color: theme.text }]}
            value={timeOrQuestions}
            onChangeText={setTimeOrQuestions}
            keyboardType="number-pad"
          />
        </View>

        <View style={[styles.settingRow, { backgroundColor: theme.surface }]}>
          <Text style={[styles.label, { color: theme.text }]}>Allow Negative Numbers</Text>
          <Switch
            value={allowNegatives}
            onValueChange={setAllowNegatives}
            trackColor={{ false: '#767577', true: theme.primary }}
            thumbColor={allowNegatives ? '#fff' : '#f4f3f4'}
          />
        </View>

        <Pressable style={[styles.startButton, { backgroundColor: theme.primary }]} onPress={handleStartGame}>
          <Text style={[styles.startButtonText, { color: '#fff' }]}>Start Practice</Text>
        </Pressable>
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
    paddingBottom: 40, // Add extra padding at bottom for scroll space
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  operation: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderRadius: 5,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedMode: {
    backgroundColor: '#666',
  },
  modeText: {
  },
  startButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 18,
  },
  radioContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  radioButtonSelected: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)', // theme.primary with opacity
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  radioText: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
});
