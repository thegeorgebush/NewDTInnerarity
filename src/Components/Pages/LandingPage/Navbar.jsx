import {
  Button,
  Grid,
  Typography,
  AppBar,
  Box,
  makeStyles
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  appBarTransparent: {
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  appBarSolid: {
    backgroundColor: "rgba(67, 129, 168)"
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const [navBackground, setNavBackground] = useState("appBarTransparent");
  const navRef = React.useRef();
  navRef.current = navBackground;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 310;
      if (show) {
        setNavBackground("appBarSolid");
      } else {
        setNavBackground("appBarTransparent");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <AppBar className={classes[navRef.current]}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-around"}
          spacing={5}
        >
          <Grid item>
            <Grid container direction={"row"} style={{ margin: "20px" }}>
              <Typography style={{ color: "white" }}>LOGO</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction={"row"} style={{ margin: "10px" }}>
              <Grid item>
                <Button style={{ color: "white" }}>About</Button>
              </Grid>
              <Grid item>
                <Button style={{ color: "white" }}>Projects</Button>
              </Grid>
              <Grid item>
                <Button style={{ color: "white" }}>Team</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default Navbar;
