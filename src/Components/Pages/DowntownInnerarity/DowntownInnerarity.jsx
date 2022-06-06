import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import RoadGround from "../../3DModels/RoadGround";
import { ScrollControls, Scroll, useScroll, Sky } from "@react-three/drei";
import { Grid, Typography, Paper } from "@material-ui/core";

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

  function LittlestTokyo({ ...props }) {
    // This hook gives you offets, ranges and other useful things
    const scroll = useScroll();
    useFrame((state, delta) => {
      // The offset is between 0 and 1, you can apply it to your models any way you like
      const offset = 1 - scroll.offset;
      state.camera.position.set(
        Math.sin(offset) * -10,
        Math.atan(offset * Math.PI * 2) * 5 + 2,
        Math.cos((offset * Math.PI) / 3) * -10
      );
      state.camera.lookAt(
        scroll.offset > 0.15 && scroll.offset < 0.4
          ? 10
          : scroll.offset > 0.3 && scroll.offset < 0.7
          ? -1
          : 0,
        scroll.offset > 0.15 && scroll.offset < 0.4
          ? -4
          : scroll.offset > 0.3 && scroll.offset < 0.7
          ? -4
          : 0,
        0
      );
    });
  }

  const renderVillage = () => {
    return (
      <>
        {/*<color args={[0, 0, 0]} attach="background" />*/}

        <spotLight
          color={[1, 0.25, 0.7]}
          intensity={1.5}
          position={[7, 11, -1]}
          angle={0.6}
          penumbra={0.5}
          castShadow
        />
        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={2}
          position={[-9, 5, -1]}
          angle={0.6}
          penumbra={0.5}
          castShadow
        />
        <group>
          <mesh>
            <RoadGround scale={[0.05, 0.05, 0.05]} />

            {/*<boxGeometry args={[1, 1, 1]} />*/}
            <meshPhysicalMaterial color={"red"} roughness={1} opacity={0.2} />
          </mesh>
        </group>
      </>
    );
  };

  return (
    <div className="App">
      <container>
        <section>
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 2]}
              shadows
              camera={{ position: [0, 0, 10], near: 0.1, far: 1000 }}
            >
              {renderVillage()}
              <ScrollControls damping={6} pages={5}>
                <LittlestTokyo />
                <Sky scale={1000} sunPosition={[2, 0.4, 10]} />
                <Scroll html style={{ width: "100%" }}>
                  <container>
                    <section>
                      <Grid
                        container
                        alignItems={"center"}
                        style={{ height: "100vh" }}
                        justifyContent={"center"}
                        direction={"column"}
                      >
                        <Grid item>
                          <Typography
                            variant={"h1"}
                            style={{
                              color: "white",
                              fontFamily: "Sans-Serif",
                              fontWeight: "550"
                            }}
                          >
                            Discover Downtown Innerarity
                          </Typography>
                        </Grid>
                      </Grid>
                    </section>
                    <section>
                      <Grid
                        container
                        alignItems={"center"}
                        style={{ height: "100vh" }}
                        justifyContent={"space-around"}
                        direction={"row"}
                        sm={6}
                        md={4}
                        lg={5}
                      >
                        <Grid item>
                          <Paper
                            style={{
                              backgroundColor: "lightblue",
                              padding: "10px"
                            }}
                          >
                            <Typography variant={"h4"}>Idea</Typography>
                            <Typography sm={2} md={4} lg={6}>
                              The future Downtown Innerarity sits on 11 lots
                              zoned for mixed use meaning this area can be built
                              up as a live, work, play environment! We envision
                              an island of urbanity complete with everything you
                              need in your daily life within a five minute walk.
                              Imagine the quality of life increase when you have
                              shops, dining expieriences, co-working spaces and
                              so much more right at your doorstep. No more
                              driving. No more headaches. Living the Perdido
                              Lifestyle!
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item />
                      </Grid>
                    </section>
                    <section>
                      <Grid
                        container
                        alignItems={"center"}
                        style={{ height: "100vh" }}
                        justifyContent={"space-around"}
                        direction={"row"}
                      >
                        <Grid item />
                        <Grid item>
                          <Typography>Plan</Typography>
                        </Grid>
                      </Grid>
                    </section>
                    <section>
                      <Grid
                        container
                        alignItems={"center"}
                        style={{ height: "100vh" }}
                        justifyContent={"center"}
                        direction={"column"}
                      >
                        <Grid item>
                          <Typography>Vision</Typography>
                        </Grid>
                      </Grid>
                    </section>
                  </container>
                </Scroll>
              </ScrollControls>
            </Canvas>
          </Suspense>
        </section>
      </container>
    </div>
  );
};

export default DowntownInnerarity;
