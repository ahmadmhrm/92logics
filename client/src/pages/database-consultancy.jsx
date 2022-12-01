import React from "react";
import "../css/websiteDevelopment.css";
import { makeStyles } from "@material-ui/core/styles";
import { Screen, Link } from "react-tiger-transition";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IconButton } from "@material-ui/core";
import Close from "../svgs/close.svg";
import MetaData from "../components/MetaData";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDatabases } from "../actions/databaseAction";
import { useAlert } from "react-alert";
import Database from "../components/database";

const useStyles = makeStyles((theme) => ({
  screen: {
    backgroundColor: "#f04f54",
    overflowY: "hidden",
  },
}));

const DatabaseConsultancy = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { databases } = useSelector((state) => state.allDatabase);

  useEffect(() => {
    dispatch(getAllDatabases());
  }, [dispatch]);
  return (
    <>
      <Screen className={classes.screen}>
        <MetaData title="92 logics - database consultancy" />
        <Carousel
          autoPlay={true}
          useKeyboardArrows={true}
          swipeable={true}
          emulateTouch={true}
          autoFocus={true}
          showArrows={false}
          showThumbs={true}
          showStatus={false}
          showIndicators={true}
          speed={2000}
          infiniteLoop={true}
          stopOnHover={true}
        >
          {databases &&
            databases.map((database) => (
              <Database database={database} key={database._id} />
            ))}
        </Carousel>
      </Screen>
      <div className="close_btn">
        <Link to="/" transition="scale" className="slide-close-button">
          <IconButton>
            <img src={Close} alt="close" />
          </IconButton>
        </Link>
      </div>
    </>
  );
};

export default DatabaseConsultancy;
