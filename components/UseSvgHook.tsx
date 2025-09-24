import React from "react";
import { Text } from "react-native";
import { Canvas, useSVG, ImageSVG } from "@shopify/react-native-skia";

const SVG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg";

const UseSvgHook = () => {
  try {
    const svg = useSVG(SVG_URL);

    return (
      <Canvas style={{ flex: 1 }}>
        <ImageSVG svg={svg} width={256} height={256} />
      </Canvas>
    );
  } catch (e: unknown) {
    return <Text>{(e as Error).message}</Text>;
  }
};

export default UseSvgHook;
