import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import AnimatedSquareCanvas from "@/components/AnimatedSquareCanvas";
import MultipleCanvases from "@/components/MultipleCanvases";
import Breathe from "@/components/Breathe";
import AnimatedImages from "@/components/AnimatedImages";
import UseSvgHook from "@/components/UseSvgHook";
import React from "react";
import ScalingImageSvg from "@/components/ScalingImageSvg";

const ExampleScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const renderExample = () => {
    switch (id) {
      case "animated-square":
        return <AnimatedSquareCanvas />;
      case "multiple-canvases":
        return <MultipleCanvases />;
      case "breathe":
        return <Breathe />;
      case "animated-images":
        return <AnimatedImages />;
      case "use-svg-hook":
        return <UseSvgHook />;
      case "scaling-image-svg":
        return <ScalingImageSvg />;
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.errorText}>Example not found</Text>
          </View>
        );
    }
  };

  return <View style={styles.container}>{renderExample()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
    color: "#666",
  },
});

export default ExampleScreen;
