import React from "react";
import {
  Canvas,
  Group,
  ImageSVG,
  Skia,
  rect,
  fitbox,
} from "@shopify/react-native-skia";

const ScalingImageSvg = () => {
  const svg = Skia.SVG.MakeFromString(
    `
      <svg viewBox='0 0 20 20' width="20" height="20" xmlns='http://www.w3.org/2000/svg'>
        <circle cx='10' cy='10' r='10' fill='red'/>
      </svg>
    `
  )!;

  const src = rect(0, 0, svg.width(), svg.height());
  const dst = rect(0, 0, 400, 400);

  return (
    <Canvas style={{ flex: 1 }}>
      <Group transform={fitbox("contain", src, dst)}>
        <ImageSVG svg={svg} x={0} y={0} width={20} height={20} />
      </Group>
    </Canvas>
  );
};

export default ScalingImageSvg;
