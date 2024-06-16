"use client";

import { Canvas, useThree } from "@react-three/fiber";
import Model from "./Model";
import { Suspense } from "react";
import { OrbitControls, useProgress, Html, ScrollControls } from "@react-three/drei";

function Loader() {
  const { progress, active } = useProgress();
  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}

export default function Scene() {
  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} className="relative h-svh">
      <directionalLight position={[0, 50, 100]} intensity={8} />
      <Suspense fallback={<Loader />}>
        <ScrollControls>
          <Model />
        </ScrollControls>
      </Suspense>
      <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={0}/>
    </Canvas>
  );
}
