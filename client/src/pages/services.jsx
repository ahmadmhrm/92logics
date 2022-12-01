import React from "react";
import "../css/services.css";
import { makeStyles } from "@material-ui/core/styles";
import { Screen } from "react-tiger-transition";
// components
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import OurServices from "../components/ourServices";

const useStyles = makeStyles((theme) => ({
  screen: {
    backgroundColor: "white",
  },
}));

const Services = () => {
  const classes = useStyles();

  return (
    <Screen className={classes.screen}>
      <MetaData title="92logics - services" />
      <Navbar />
      <OurServices title="our services" />
    </Screen>
  );
};

export default Services;
