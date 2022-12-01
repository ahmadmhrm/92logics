import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navber from "./navbar";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllBanners,
  deleteBanner,
} from "../actions/bannerAction";
import { loadUser } from "../actions/userAction";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-tiger-transition";
import { DELETE_BANNER_RESET } from "../constants/bannerConstant";
import { useAlert } from "react-alert";

const Banners = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { banners } = useSelector((state) => state.allBanners);
  const { user } = useSelector((state) => state.user);
  const { error, isDeleted } = useSelector((state) => state.banner);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Banner Deleted Successfully");
      dispatch({ type: DELETE_BANNER_RESET });
    }

    dispatch(getAllBanners());
    dispatch(loadUser());
  }, [dispatch, error, alert, isDeleted]);
  return (
    <>
      <div className="banner">
        <Navber />
        <div className="bubbles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Carousel
          autoPlay={true}
          useKeyboardArrows={true}
          swipeable={true}
          stopOnHover={true}
          emulateTouch={true}
          autoFocus={true}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          speed={500}
          infiniteLoop={true}
          showIndicators={false}
        >
          <div className="banner-boxes">
            <div className="banner-content">
              <h1 className="we">we</h1>
              <div className="create-section">
                <h1 className="create">create</h1>
                <h3 className="awesome">awesome solution</h3>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="banner-image">
              <img src="/assets/banner1.png" />
            </div>
          </div>
          <div className="banner-boxes">
            <div className="banner-content">
              <h1 className="we">we</h1>
              <div className="create-section">
                <h1 className="create">DEVELOP</h1>
                <h3 className="awesome">ENGAGING EXPERIENCE</h3>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="banner-image">
              <img src="/assets/gallery3.png" />
            </div>
          </div>
          <div className="banner-boxes">
            <div className="banner-content">
              <h1 className="we">we</h1>
              <div className="create-section">
                <h1 className="create">DEVELOP</h1>
                <h3 className="awesome">Web app & Mobile app</h3>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="banner-image">
              <img src="/assets/banner2.png" />
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};
export default Banners;
