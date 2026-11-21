import { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

export default function App() {
  const [percent, setPercent] = useState(0);
  const progress = useSharedValue(0);

  const handlePress = () => {
    const nextValue = percent >= 100 ? 0 : percent + 25;
    setPercent(nextValue);
    progress.value = withTiming(nextValue, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 25, 50, 75, 100],
      ["#ffffff", "#408459", "#5ec4ed", "#f3c43b", "#c3474c"]
    );

    return {
      width: `${progress.value}%`,
      backgroundColor,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, animatedStyle]}>
          {percent > 0 && <Text style={styles.text}>{percent}%</Text>}
        </Animated.View>
      </View>
      <Button title="Next" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  track: {
    width: "100%",
    height: 28,
    backgroundColor: "#e5e7eb",
    borderRadius: 14,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
});