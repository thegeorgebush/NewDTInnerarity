import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  MeshReflectorMaterial
} from "@react-three/drei";
import RoadGround from "../../3DModels/RoadGround";
import InfoBar from "./infoBar";
import Navbar from "../../Navbar";
import { Text } from "@react-three/drei";

function Caption({ children }) {
  const { width } = useThree((state) => state.viewport);
  return (
    <Text
      position={[0, 0, -5]}
      lineHeight={0.8}
      font="/Ki-Medium.ttf"
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
}

const DowntownInnerarity = () => {
  const [money, setMoney] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [Paused, setPaused] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  //sets whethere go to work button enabled or not
  const [btnDisabled, setBtnDisabled] = useState(false);
  //an array of properties owned
  const [properties, setProperties] = useState([]);
  //Determines if lots are bought or not
  const [Address, setAddress] = useState();
  const [Zestamate, setZestamte] = useState();
  const [lastSold, setLastSold] = useState();
  const [LikleyhoodToSell, setLikelyhoodToSell] = useState();

  const [lotCount, setLotCount] = useState(0);
  const [open, setOpen] = React.useState(false);

  const renderVillage = () => {
    return (
      <>
        <OrbitControls
          minPolarAngle={Math.PI / 3.0}
          maxPolarAngle={Math.PI / 3.0}
          enablePan={false}
          enableZoom={false}
        />
        <PerspectiveCamera makeDefault fov={50} position={[1, 1, 2]} />

        {/*<color args={[0, 0, 0]} attach="background" />*/}

        <spotLight
          color={[1, 0.25, 0.7]}
          intensity={1.5}
          position={[3, 4, -1]}
          angle={0.6}
          penumbra={0.5}
          castShadow
        />
        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={2}
          position={[-7, 3, -1]}
          angle={0.6}
          penumbra={0.5}
          castShadow
        />
        <group>
          <mesh>
            <RoadGround scale={[0.01, 0.01, 0.01]} />

            {/*<boxGeometry args={[1, 1, 1]} />*/}
            <meshPhysicalMaterial color={"red"} roughness={1} opacity={0.2} />
          </mesh>
        </group>
      </>
    );
  };

  return (
    <div className="App">
      <Navbar />
      <InfoBar
        Paused={Paused}
        setMoney={setMoney}
        setSeconds={setSeconds}
        setOpen={setOpen}
        setIntervalId={setIntervalId}
        setBtnDisabled={setBtnDisabled}
        setPaused={setPaused}
        seconds={seconds}
        intervalId={intervalId}
        open={open}
        btnDisabled={btnDisabled}
        money={money}
        Address={Address}
        Zestamate={Zestamate}
        lastSold={lastSold}
        LikleyhoodToSell={LikleyhoodToSell}
        lotCount={lotCount}
      />
      <Suspense fallback={null}>
        <Canvas
          shadows
          style={{ width: "100vw", height: "80vh", display: "block" }}
        >
          <Text>HI</Text>
          {renderVillage()}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default DowntownInnerarity;
