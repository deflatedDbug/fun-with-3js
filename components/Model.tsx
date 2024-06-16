import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useDrag } from "react-use-gesture";
import { useSpring, a } from "@react-spring/three";

useGLTF.preload("/animated-car.glb");

export default function Model() {
  const group = useRef<Group>(null);
  const { nodes, materials, animations, scene } = useGLTF(
    "../animated-car.glb"
  );
  const { actions, clips } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    console.log("Actions:", actions);
    actions["AllActions"].play().paused = true;
  }, [actions]);
  useFrame(
    () =>
      //@ts-ignore
      (actions["AllActions"].time =
        //@ts-ignore
        (actions["AllActions"].getClip().duration * scroll.offset) / 4)
  );

  const [{position}, api] = useSpring(() => ({
    position: [0,0,0],
  }));

  const bind = useDrag(({offset: [x,y]}) => {
    api.start({position: [x/100, -y / 100, 0]})
  })
  return (
    <a.group ref={group} {...bind()} position={position}>
      <primitive object={scene} />
    </a.group>
  );
}
