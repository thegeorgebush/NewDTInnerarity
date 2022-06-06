import { Button, Grid, Typography, AppBar, Box } from "@material-ui/core";
import React from "react";
import backgroundIm from "../../../Assets/DowntownPensacolaBackground.jpeg";
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
    <div
      className={"background-image"}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundIm})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100%",
        height: "100vh",
        position: "relative",
        backgroundRepeat: "no-repeat",
        margin: "20px -20px -20px -20px"
      }}
    >
      <container>
        <section>
          <Navbar />
          <Grid
            container
            alignItems={"center"}
            style={{ height: "100vh" }}
            justifyContent={"center"}
            direction={"column"}
          >
            <Grid item style={{ margin: "60px" }}>
              <Typography
                variant={"h1"}
                style={{
                  color: "white",
                  fontFamily: "Sans-Serif",
                  fontWeight: "550"
                }}
              >
                Introducing Nutty Development
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color={"primary"}
                variant={"contained"}
                style={{ fontFamily: "Sans-Serif" }}
              >
                Learn More
              </Button>
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
              <Typography>About</Typography>
            </Grid>
            <Grid item>
              <Typography
                variant={"h4"}
                style={{ maxWidth: "900px", fontFamily: "sans-serif" }}
              >
                We are Nutty Development, a group who truly belives in what it
                means to be a city. We specialize in urban infill and town
                center activations that truely build communty and character.
              </Typography>
            </Grid>
          </Grid>
        </section>
        <section>
          <h1>hi 2</h1>
        </section>
      </container>
    </div>
  );
};

export default LandingPage;
