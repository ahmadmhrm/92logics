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
import { getAllMigrations } from "../actions/migrationAction";
import Migration from "../components/migration";

const useStyles = makeStyles((theme) => ({
  screen: {
    backgroundColor: "#03a5db",
    overflowY: "hidden",
  },
}));

const MigrationExpert = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { migrations } = useSelector((state) => state.allMigration);

  useEffect(() => {
    dispatch(getAllMigrations());
  }, [dispatch]);
  return (
    <>
      <Screen className={classes.screen}>
        <MetaData title="92 logics - migrations experts" />
        <Carousel
          autoPlay={true}
          useKeyboardArrows={true}
          swipeable={false}
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
          {migrations &&
            migrations.map((migration) => (
              <Migration migration={migration} key={migration._id} />
            ))}
        </Carousel>
      </Screen>
      <div className="close_btn">
        <Link to="/services" transition="scale" className="slide-close-button">
          <IconButton>
            <img src={Close} alt="close" />
          </IconButton>
        </Link>
      </div>
      <div className="back_btn">
        <Link
          to="/services"
          transition="glide-right"
          className="slide-close-button"
        >
          <IconButton>
            <img src="/assets/back.png" alt="close" />
          </IconButton>
        </Link>
      </div>
    </>
  );
};

export default MigrationExpert;
