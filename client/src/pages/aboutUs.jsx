import React from "react";
import About from "../components/about";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";

const AboutUs = () => {
  return (
    <>
      <MetaData title="92 logics - about" />
      <Navbar />
      <About className="about_page" />
    </>
  );
};

export default AboutUs;
