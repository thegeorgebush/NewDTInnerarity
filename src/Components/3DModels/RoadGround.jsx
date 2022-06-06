import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio";
import Crane from "./Crane";
import Buildings from "./Buildings";
import { useFrame } from "@react-three/fiber";

const state = proxy({
  current: null,
  lots: {
    Lot1: {
      craneVis: false,
      building1Vis: true,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [-12.5, -2, 19],
      building2Pos: [-12, 0, 22],
      building3Pos: [-10.5, -2, 22.01]
    },
    Lot2: {
      craneVis: false,
      building1Vis: true,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [-12.5, -2, 5],
      building2Pos: [-12, 0, 5],
      building3Pos: [-10.5, -2, 8.01]
    },
    Lot3: {
      craneVis: false,
      building1Vis: true,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [-4.5, -2, 19],
      building2Pos: [-4, 0, 22],
      building3Pos: [-2.5, -2, 22.01]
    },
    Lot4: {
      craneVis: false,
      building1Vis: true,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [-4.5, -2, 5],
      building2Pos: [-4, 0, 7],
      building3Pos: [-2.5, -2, 8.01]
    },
    Lot5: {
      craneVis: false,
      building1Vis: true,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [-4.5, -2, -12],
      building2Pos: [-4, 0, -10],
      building3Pos: [-2.5, -2, -9.01]
    },
    Lot6: {
      craneVis: false,
      building1Vis: true,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [5.5, -2, -6],
      building2Pos: [5, 0, -4],
      building3Pos: [3.5, -2, -3.01]
    },
    Lot7: {
      craneVis: false,
      building1Vis: true,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [8.5, -2, -18],
      building2Pos: [8, 0, -15],
      building3Pos: [10.5, -2, -15.01]
    },
    Lot8: {
      craneVis: false,
      building1Vis: false,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [11.5, -2, -7],
      building2Pos: [11, 0, -5],
      building3Pos: [13.5, -2, -4.01]
    },
    Lot9: {
      craneVis: false,
      building1Vis: false,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [14, -2, -5],
      building2Pos: [16, 0, -4],
      building3Pos: [16, -2, -2.01]
    },
    Lot10: {
      craneVis: false,
      building1Vis: true,
      building2Vis: true,
      building3Vis: true,
      building1Pos: [14, -2, -15],
      building2Pos: [19, 0, -16],
      building3Pos: [15, -2, -12]
    }
  }
});

function RoadGround(props) {
  const { materials } = useGLTF("RoadGroundDraco.glb");
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const snap = useSnapshot(state);

  useFrame(() => {
    if (clicked) {
      if (snap.lots[props.current].building2Pos[1] > -3) {
        state.lots[props.current].building2Pos[1] -= 0.002;
      } else if (
        snap.lots[props.current].building2Pos[1] < -2 &&
        snap.lots[props.current].building1Pos[1] < 1
      ) {
        state.lots[props.current].building1Pos[1] += 0.002;
        state.lots[props.current].building3Pos[1] += 0.002;
      } else {
        state.lots[props.current].craneVis = false;
      }
    }
  });

  const craneVisiblity = (event) => {
    click(!clicked);
    //update();
    state.current = props.current;
    console.log(snap.current);

    state.lots[props.current].craneVis = !state.lots[props.current].craneVis;
    //props.setCraneVisible = !state.craneVis.Lot1
    //console.log("set cran vis: " + props.setCraneVisible)
    //(prevCheck) => !prevCheck
  };

  return (
    <>
      <mesh
        geometry={props.geometry}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
        onClick={craneVisiblity}
        material={
          clicked
            ? materials.Railing
            : hovered
            ? materials["Road Lines"]
            : materials.Grass
        }
      />
    </>
  );
}

export default function Test({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("RoadGroundDraco.glb");
  const snap = useSnapshot(state);
  const ref = useRef();
  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <mesh geometry={nodes.Cube008.geometry} material={materials.Railing} />
        <mesh
          geometry={nodes.Cube008_1.geometry}
          material={materials["Road Lines"]}
        />
        <RoadGround geometry={nodes.Lot1.geometry} current={"Lot1"} />
        <RoadGround geometry={nodes.Lot2.geometry} current={"Lot2"} />
        <RoadGround geometry={nodes.Lot3.geometry} current={"Lot3"} />
        <RoadGround geometry={nodes.Lot4.geometry} current={"Lot4"} />
        <RoadGround geometry={nodes.Lot5.geometry} current={"Lot5"} />
        <RoadGround geometry={nodes.Lot6.geometry} current={"Lot6"} />
        <RoadGround geometry={nodes.Lot7.geometry} current={"Lot7"} />
        <RoadGround geometry={nodes.Lot8.geometry} current={"Lot8"} />
        <RoadGround geometry={nodes.Lot9.geometry} current={"Lot9"} />
        <RoadGround geometry={nodes.Lot10.geometry} current={"Lot10"} />
      </group>
      <group>
        {/**lot1 */}
        <Crane
          visible={snap.lots.Lot1.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[-0.5, 0, 0.9]}
          rotation={[0, 180, 0]}
        />
        {/**lot2 */}
        <Crane
          visible={snap.lots.Lot2.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[-0.5, 0, 0.3]}
          rotation={[0, 160, 0]}
        />
        {/**lot3 */}
        <Crane
          visible={snap.lots.Lot3.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[-0.1, 0, 0.9]}
          rotation={[0, 120, 0]}
        />
        {/**lot4 */}
        <Crane
          visible={snap.lots.Lot4.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[-0.1, 0, 0.3]}
          rotation={[0, 182, 0]}
        />
        {/**lot5 */}
        <Crane
          visible={snap.lots.Lot5.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[-0.4, 0, -0.2]}
          rotation={[0, 170, 0]}
        />
        {/**lot6 */}
        <Crane
          visible={snap.lots.Lot6.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[0.3, 0, -0.2]}
          rotation={[0, 180, 0]}
        />
        {/**lot7 */}
        <Crane
          visible={snap.lots.Lot7.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[0.3, 0, -0.6]}
          rotation={[0, 180, 0]}
        />
        {/**lot8 */}
        <Crane
          visible={snap.lots.Lot8.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[0.4, 0, -0.2]}
          rotation={[0, 200, 0]}
        />
        {/**lot9 */}
        <Crane
          visible={snap.lots.Lot9.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[0.6, 0, -0.3]}
          rotation={[0, 140, 0]}
        />
        {/**lot10 */}
        <Crane
          visible={snap.lots.Lot10.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[0.75, 0, -0.6]}
          rotation={[0, 180, 0]}
        />
        {/**lot11 */}
        <Crane
          visible={snap.lots.Lot10.craneVis}
          scale={[0.01, 0.01, 0.01]}
          position={[0.3, 0, -0.2]}
          rotation={[0, 180, 0]}
        />
      </group>
      <group>
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot1.building1Pos}
          building2Pos={snap.lots.Lot1.building2Pos}
          building3Pos={snap.lots.Lot1.building3Pos}
          building1Vis={snap.lots.Lot1.building1Vis}
          building2Vis={snap.lots.Lot1.building2Vis}
          building3Vis={snap.lots.Lot1.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot2.building1Pos}
          building2Pos={snap.lots.Lot2.building2Pos}
          building3Pos={snap.lots.Lot2.building3Pos}
          building1Vis={snap.lots.Lot2.building1Vis}
          building2Vis={snap.lots.Lot2.building2Vis}
          building3Vis={snap.lots.Lot2.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot3.building1Pos}
          building2Pos={snap.lots.Lot3.building2Pos}
          building3Pos={snap.lots.Lot3.building3Pos}
          building1Vis={snap.lots.Lot3.building1Vis}
          building2Vis={snap.lots.Lot3.building2Vis}
          building3Vis={snap.lots.Lot3.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot4.building1Pos}
          building2Pos={snap.lots.Lot4.building2Pos}
          building3Pos={snap.lots.Lot4.building3Pos}
          building1Vis={snap.lots.Lot4.building1Vis}
          building2Vis={snap.lots.Lot4.building2Vis}
          building3Vis={snap.lots.Lot4.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot5.building1Pos}
          building2Pos={snap.lots.Lot5.building2Pos}
          building3Pos={snap.lots.Lot5.building3Pos}
          building1Vis={snap.lots.Lot5.building1Vis}
          building2Vis={snap.lots.Lot5.building2Vis}
          building3Vis={snap.lots.Lot5.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot6.building1Pos}
          building2Pos={snap.lots.Lot6.building2Pos}
          building3Pos={snap.lots.Lot6.building3Pos}
          building1Vis={snap.lots.Lot6.building1Vis}
          building2Vis={snap.lots.Lot6.building2Vis}
          building3Vis={snap.lots.Lot6.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot7.building1Pos}
          building2Pos={snap.lots.Lot7.building2Pos}
          building3Pos={snap.lots.Lot7.building3Pos}
          building1Vis={snap.lots.Lot7.building1Vis}
          building2Vis={snap.lots.Lot7.building2Vis}
          building3Vis={snap.lots.Lot7.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot8.building1Pos}
          building2Pos={snap.lots.Lot8.building2Pos}
          building3Pos={snap.lots.Lot8.building3Pos}
          building1Vis={snap.lots.Lot8.building1Vis}
          building2Vis={snap.lots.Lot8.building2Vis}
          building3Vis={snap.lots.Lot8.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot9.building1Pos}
          building2Pos={snap.lots.Lot9.building2Pos}
          building3Pos={snap.lots.Lot9.building3Pos}
          building1Vis={snap.lots.Lot9.building1Vis}
          building2Vis={snap.lots.Lot9.building2Vis}
          building3Vis={snap.lots.Lot9.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
        <Buildings
          ref={ref}
          building1Pos={snap.lots.Lot10.building1Pos}
          building2Pos={snap.lots.Lot10.building2Pos}
          building3Pos={snap.lots.Lot10.building3Pos}
          building1Vis={snap.lots.Lot10.building1Vis}
          building2Vis={snap.lots.Lot10.building2Vis}
          building3Vis={snap.lots.Lot10.building3Vis}
          scale={[0.04, 0.04, 0.04]}
        />
      </group>
    </>
  );
}

useGLTF.preload("/RoadGroundDraco.glb");
