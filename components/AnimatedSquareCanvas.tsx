import { Canvas, Rect } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedSquareCanvas = () => {
  const [rects, setRects] = useState(2);
  const x = useSharedValue(0);
  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(100, { duration: 1000 }),
        withTiming(0, { duration: 1000 }),
      ),
      -1,
    );
  }, [x]);
  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => setRects(i => i + 1)} style={{ flex: 1 }}>
        <Canvas style={{ width: "100%", height: "100%" }}>
          <Rect color="blue" x={0} y={0} width={10} height={100} />
          {Array.from({ length: rects }).map((_, i) => (
            <Rect
              key={i}
              x={x}
              y={i * 100}
              width={100}
              height={100}
              color="blue"
            />
          ))}
        </Canvas>
      </Pressable>
    </View>
  );
};
export default AnimatedSquareCanvas;
