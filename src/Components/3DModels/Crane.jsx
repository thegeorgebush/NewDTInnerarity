/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Crane({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("craneDraco.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.CraneArmRotation.setDuration(5).play();
    actions.CraneBaseRotation.setDuration(5).play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Tower_Crane_Anamated">
        <group name="CraneBase">
          <mesh
            name="Plane143"
            geometry={nodes.Plane143.geometry}
            material={materials["TowerCrane.002"]}
          />
          <mesh
            name="Plane143_1"
            geometry={nodes.Plane143_1.geometry}
            material={materials["window.006"]}
          />
        </group>
        <mesh
          name="CraneArm"
          geometry={nodes.CraneArm.geometry}
          material={materials["TowerCrane.002"]}
          scale={[1, 0.5, 1]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/craneDraco.glb");
