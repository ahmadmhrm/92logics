import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Screen } from "react-tiger-transition";
// components
import Banners from "../components/banners";
import Ourclients from "../components/ourclients";
import OurProjects from "../components/ourProjects";
import OurServices from "../components/ourServices";
import About from "../components/about";
import Registered from "../components/registered";

const useStyles = makeStyles((theme) => ({
  screen: {
    backgroundColor: "white",
    overflowX: "hidden",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Screen className={classes.screen}>
      <Banners />
      <OurServices title="Our services" />
      <About className="about_Home" />
      <Registered />
      <OurProjects />
      <Ourclients />
    </Screen>
  );
};

export default Home;
