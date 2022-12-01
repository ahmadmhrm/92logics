import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/websiteDevelopment.css";
import { makeStyles } from "@material-ui/core/styles";
import { Screen, Link } from "react-tiger-transition";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { IconButton } from "@material-ui/core";
import Close from "../svgs/close.svg";
import MetaData from "../components/MetaData";
import Develop from "../components/develop";
import { getAllWebs } from "../actions/webAction";
import { useAlert } from "react-alert";

const useStyles = makeStyles((theme) => ({
  screen: {
    backgroundColor: "#1fae55",
    overflowY: "hidden",
  },
}));

const WebsiteDevelopment = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { webs } = useSelector((state) => state.allWeb);

  useEffect(() => {
    dispatch(getAllWebs());
  }, [dispatch]);

  return (
    <>
      <Screen className={classes.screen}>
        <MetaData title="92 logics - website development" />
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
          {webs && webs.map((web) => <Develop web={web} key={web._id} />)}
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

export default WebsiteDevelopment;
