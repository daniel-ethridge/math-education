import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '../../context/theme-context';
import Svg, { Line, Text as SvgText } from 'react-native-svg';

export default function CoordinatePlaneScreen() {
  const { theme } = useTheme();
  const width = Dimensions.get('window').width - 40; // 20px padding on each side
  const height = width; // Make it square
  const center = { x: width / 2, y: height / 2 };
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>The Coordinate Plane</Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>What is a Coordinate Plane?</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            A coordinate plane is formed by two number lines that intersect at right angles.
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• The horizontal line is the x-axis</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• The vertical line is the y-axis</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• They intersect at the origin (0,0)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Plotting Points</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            Each point is described by two numbers (x,y):
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• First number (x): move left/right</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Second number (y): move up/down</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>The Four Quadrants</Text>
          <Text style={[styles.text, { color: theme.text }]}>
            The axes divide the plane into four quadrants:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={[styles.bullet, { color: theme.text }]}>• Quadrant I: (+,+)</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Quadrant II: (-,+)</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Quadrant III: (-,-)</Text>
            <Text style={[styles.bullet, { color: theme.text }]}>• Quadrant IV: (+,-)</Text>
          </View>
        </View>

        {/* Add coordinate plane visualization */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Visual Reference</Text>
          <View style={styles.graphContainer}>
            <Svg width={width} height={height}>
              {/* Grid lines */}
              {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((i) => (
                <React.Fragment key={`grid-${i}`}>
                  {/* Vertical grid line */}
                  <Line
                    x1={center.x + (i * width) / 10}
                    y1={0}
                    x2={center.x + (i * width) / 10}
                    y2={height}
                    stroke={theme.text}
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                  {/* Horizontal grid line */}
                  <Line
                    x1={0}
                    y1={center.y + (i * height) / 10}
                    x2={width}
                    y2={center.y + (i * height) / 10}
                    stroke={theme.text}
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                </React.Fragment>
              ))}

              {/* Main axes */}
              <Line
                x1={center.x}
                y1={0}
                x2={center.x}
                y2={height}
                stroke={theme.text}
                strokeWidth="2"
              />
              <Line
                x1={0}
                y1={center.y}
                x2={width}
                y2={center.y}
                stroke={theme.text}
                strokeWidth="2"
              />

              {/* Axis labels */}
              <SvgText
                x={width - 20}
                y={center.y - 10}
                fill={theme.text}
                fontSize="16"
              >
                x
              </SvgText>
              <SvgText
                x={center.x + 10}
                y={20}
                fill={theme.text}
                fontSize="16"
              >
                y
              </SvgText>

              {/* Quadrant labels */}
              <SvgText
                x={center.x + width/4}
                y={center.y - height/4}
                fill={theme.text}
                fontSize="16"
                textAnchor="middle"
              >
                I
              </SvgText>
              <SvgText
                x={center.x - width/4}
                y={center.y - height/4}
                fill={theme.text}
                fontSize="16"
                textAnchor="middle"
              >
                II
              </SvgText>
              <SvgText
                x={center.x - width/4}
                y={center.y + height/4}
                fill={theme.text}
                fontSize="16"
                textAnchor="middle"
              >
                III
              </SvgText>
              <SvgText
                x={center.x + width/4}
                y={center.y + height/4}
                fill={theme.text}
                fontSize="16"
                textAnchor="middle"
              >
                IV
              </SvgText>
            </Svg>
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
  bulletPoints: {
    paddingLeft: 10,
    marginVertical: 8,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 28,
  },
  graphContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 10,
    backgroundColor: 'rgba(128,128,128,0.1)',
    borderRadius: 10,
  },
});
