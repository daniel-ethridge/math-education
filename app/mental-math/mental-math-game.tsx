import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../context/theme-context';

// Interface for tracking previous problem state including the problem components and user's response
interface PreviousProblem {
  firstNum: number;
  secondNum: number;
  operation: string;
  userAnswer: number;
  correctAnswer: number;
}

export default function MentalMathGameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { 
    operation: rawOperation, 
    firstNumber, 
    minNumber, 
    maxNumber, 
    isTimedMode, 
    timeOrQuestions,
    problemType = 'squares' // Change default to squares
  } = params;
  // Extract and handle array params (needed for proper type handling in Expo Router)
  const operation = Array.isArray(rawOperation) ? rawOperation[0] : rawOperation;
  const allowNegatives = params.allowNegatives === 'true';

  const { theme } = useTheme();

  // Convert params to proper types since they come as strings
  const firstNum = Number(firstNumber);
  const minNum = Number(minNumber);
  const maxNum = Number(maxNumber);
  const isTimedModeBool = isTimedMode === 'true';
  const timeOrQuestionsNum = Number(timeOrQuestions);

  // Update state initialization with converted values
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [timeLeft, setTimeLeft] = useState(isTimedModeBool ? timeOrQuestionsNum * 60 : 0);
  const [questionsLeft, setQuestionsLeft] = useState(!isTimedModeBool ? timeOrQuestionsNum : 0);
  const [previousProblem, setPreviousProblem] = useState<PreviousProblem | null>(null);
  const [firstDisplayNumber, setFirstDisplayNumber] = useState(firstNum);
  const [isSquareRoot, setIsSquareRoot] = useState(() => {
    if (problemType === 'squares') return false;
    if (problemType === 'roots') return true;
    return false; // Default to squares for 'both' or any other value
  });
  const [lastProblemNumbers, setLastProblemNumbers] = useState({ first: 0, second: 0 });
  const [operandsReversed, setOperandsReversed] = useState(false);

  useEffect(() => {
    // For Squares and Square Roots, generate initial problem immediately
    // to ensure first display is correct
    if (operation === 'Squares and Square Roots') {
      if (isSquareRoot) {
        const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        const firstNum = answer * answer;
        setFirstDisplayNumber(firstNum);
        setLastProblemNumbers({ first: firstNum, second: 2 });
      } else {
        const numberToSquare = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        setFirstDisplayNumber(numberToSquare);
        setLastProblemNumbers({ first: numberToSquare, second: 2 });
      }
      setSecondNumber(2);
    }
  }, []); // Run once on mount

  // Helper function to randomly make numbers negative when allowed
  const makeNumberPotentiallyNegative = (num: number) => {
    if (!allowNegatives) return num;
    return Math.random() < 0.5 ? -num : num;
  };

  // Main problem generation logic
  const generateNewProblem = () => {
    let newFirst, newSecond;
    
    if (operation === 'Squares and Square Roots') {
      // For square roots: we work backwards from the answer to ensure integer results
      // For squares: we just need a random number to be squared
      do {
        if (!isSquareRoot) {
          newFirst = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
          newFirst = makeNumberPotentiallyNegative(newFirst);
        } else {
          const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
          newFirst = answer * answer;
        }
      } while (newFirst === lastProblemNumbers.first);
      
      newSecond = 2;
    } else if (operation === 'Division') {
      // For division: create dividend by multiplying first number by random multiplier
      // This ensures all division problems have integer answers
      do {
        const randomMultiplier = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        newFirst = makeNumberPotentiallyNegative(firstNum * randomMultiplier);
        newSecond = makeNumberPotentiallyNegative(firstNum);
      } while (newFirst === lastProblemNumbers.first);
      setOperandsReversed(false);
    } else {
      // For addition/subtraction/multiplication:
      // 1. Generate second operand randomly
      // 2. Apply negative numbers if allowed
      // 3. For subtraction without negatives, ensure first > second
      // 4. For addition/multiplication, randomly swap operands
      do {
        newSecond = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        newFirst = firstNum;
        // Make each number potentially negative independently
        newFirst = makeNumberPotentiallyNegative(newFirst);
        newSecond = makeNumberPotentiallyNegative(newSecond);
      } while (newSecond === lastProblemNumbers.second);

      if (!allowNegatives && operation === 'Subtraction' && newFirst < newSecond) {
        [newFirst, newSecond] = [newSecond, newFirst];
      } else if (operation !== 'Subtraction' && Math.random() < 0.5) {
        [newFirst, newSecond] = [newSecond, newFirst];
      }
      setOperandsReversed(newFirst !== firstNum);
    }

    setFirstDisplayNumber(newFirst);
    setSecondNumber(newSecond);
    setLastProblemNumbers({ first: newFirst, second: newSecond });
    setCurrentAnswer('');
  };

  // Controls problem type alternation for squares/roots and generates new numbers
  const generateProblem = () => {
    if (operation === 'Squares and Square Roots') {
      // Determine if next problem should be square root based on problemType
      const nextIsRoot = problemType === 'roots' ? true :
                        problemType === 'squares' ? false :
                        !isSquareRoot;
      
      setIsSquareRoot(nextIsRoot);
    }
    generateNewProblem();
  };

  const getAnswerStatus = (userAnswer: number, correctAnswer: number) => {
    if (userAnswer === correctAnswer) return 'Correct!';
    if (Math.abs(userAnswer - correctAnswer) <= 2) return `Almost! The answer was ${correctAnswer}`;
    return `Incorrect. The answer was ${correctAnswer}`;
  };

  // Evaluate answer and provide feedback
  const checkAnswer = () => {
    const userAnswer = parseInt(currentAnswer);
    let correctAnswer = 0;
    // For addition/multiplication, order doesn't matter
    // For subtraction/division, order matters so we use original order
    const a = operandsReversed ? secondNumber : firstDisplayNumber;
    const b = operandsReversed ? firstDisplayNumber : secondNumber;
    
    // Calculate correct answer based on operation
    switch (operation) {
      case 'Squares and Square Roots':
        if (isSquareRoot) {
          correctAnswer = Math.sqrt(firstDisplayNumber); // Will be an integer due to our generation method
        } else {
          correctAnswer = firstDisplayNumber * firstDisplayNumber;
        }
        break;
      case 'Addition':
        correctAnswer = a + b;  // Order doesn't matter
        break;
      case 'Subtraction':
        correctAnswer = firstDisplayNumber - secondNumber;  // Keep original order
        break;
      case 'Multiplication':
        correctAnswer = a * b;  // Order doesn't matter
        break;
      case 'Division':
        correctAnswer = firstDisplayNumber / secondNumber;  // Keep original order
        break;
    }

    // Store problem for display in previous problem box
    setPreviousProblem({
      firstNum: firstDisplayNumber,
      secondNum: secondNumber,
      // Fix the operation assignment to match the current problem type
      operation: operation === 'Squares and Square Roots' 
        ? (isSquareRoot ? 'Square Root' : 'Square')
        : operation,
      userAnswer,
      correctAnswer,
    });

    // Update score and check if game should end
    if (userAnswer === correctAnswer) setScore(score + 1);
    
    if (!isTimedModeBool) {
      setQuestionsLeft(questionsLeft - 1);
      if (questionsLeft <= 1) {
        router.push({
          pathname: '/mental-math/mental-math-settings',
          params: {
            operation,
            firstNumber,
            minNumber,
            maxNumber,
            isTimedMode,
            timeOrQuestions,
            problemType
          }
        });
        return;
      }
    }
    
    generateProblem();
  };

  // Initial setup and timer management
  useEffect(() => {
    // Generate first problem immediately
    generateProblem();

    // For timed mode: set up countdown timer
    // For question mode: this effect only generates initial problem
    if (isTimedModeBool) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push({
              pathname: '/mental-math/mental-math-settings',
              params: {
                operation,
                firstNumber,
                minNumber,
                maxNumber,
                isTimedMode,
                timeOrQuestions,
                problemType
              }
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {previousProblem && (
        <View style={[styles.previousProblem, { backgroundColor: theme.surface }]}>
          <View style={styles.previousProblemRow}>
            <Text style={[styles.previousProblemText, { color: theme.text }]}>
              {previousProblem.operation === 'Square Root' ? (
                `√${previousProblem.firstNum}`
              ) : previousProblem.operation === 'Square' ? (
                <>
                  {previousProblem.firstNum}
                  <Text style={[styles.superscript, { color: theme.text }]}>²</Text>
                </>
              ) : (
                `${previousProblem.firstNum} ${
                  previousProblem.operation === 'Addition' ? '+' : 
                  previousProblem.operation === 'Subtraction' ? '-' : 
                  previousProblem.operation === 'Multiplication' ? '×' : 
                  '÷'
                } ${previousProblem.secondNum}`
              )}
              {' = '}{previousProblem.userAnswer}
            </Text>
          </View>
          <Text style={[
            styles.statusText,
            previousProblem.userAnswer === previousProblem.correctAnswer ? styles.correctStatus :
            Math.abs(previousProblem.userAnswer - previousProblem.correctAnswer) <= 2 ? styles.almostStatus :
            styles.incorrectStatus
          ]}>
            {getAnswerStatus(previousProblem.userAnswer, previousProblem.correctAnswer)}
          </Text>
        </View>
      )}
      <Text style={[styles.score, { color: theme.text }]}>Score: {score}</Text>
      {isTimedModeBool ? (
        <Text style={[styles.timer, { color: theme.text }]}>Time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Text>
      ) : (
        <Text style={[styles.questions, { color: theme.text }]}>Questions Left: {questionsLeft}</Text>
      )}

      <View style={styles.problem}>
        <Text style={[styles.problemText, { color: theme.text }]}>
          {operation === 'Squares and Square Roots' ?
            (isSquareRoot ? `√${firstDisplayNumber}` : `${firstDisplayNumber}²`) :
            `${firstDisplayNumber} ${operation === 'Addition' ? '+' : 
              operation === 'Subtraction' ? '-' : 
              operation === 'Multiplication' ? '×' : '÷'} ${secondNumber}`
          }
        </Text>
      </View>

      <TextInput
        style={[styles.input, { 
          backgroundColor: theme.inputBackground,
          color: theme.text
        }]}
        value={currentAnswer}
        onChangeText={setCurrentAnswer}
        keyboardType="number-pad"
        autoFocus
      />

      <Pressable 
        style={[styles.submitButton, { backgroundColor: theme.primary }]} 
        onPress={checkAnswer}
      >
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  score: {
    fontSize: 20,
    textAlign: 'right',
  },
  timer: {
    fontSize: 20,
    textAlign: 'center',
  },
  questions: {
    fontSize: 20,
    textAlign: 'center',
  },
  problem: {
    alignItems: 'center',
    marginVertical: 40,
  },
  problemText: {
    fontSize: 40,
  },
  input: {
    fontSize: 24,
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
  },
  submitButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
  previousProblem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  previousProblemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  superscript: {
    fontSize: 12,
    lineHeight: 14, // Reduced from 20 to raise it higher
    marginTop: -5,  // Added negative margin to raise it even more
  },
  previousProblemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  correctStatus: {
    color: '#4CAF50',
  },
  almostStatus: {
    color: '#FFC107',
  },
  incorrectStatus: {
    color: '#F44336',
  },
});
