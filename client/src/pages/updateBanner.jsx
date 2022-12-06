import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getBannerDetails,
  updateBanner,
} from "../actions/bannerAction";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import InfoIcon from "@material-ui/icons/Info";
import Sidebar from "../components/sidebar";
import { UPDATE_BANNER_RESET } from "../constants/bannerConstant";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";

const UpdateBanner = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, bannerDetail } = useSelector((state) => state.bannerDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.banner);

  const [we, setWe] = useState("");
  const [create, setCreate] = useState("");
  const [awesome, setAwesome] = useState("");
  const [image, setImage] = useState("/service.png");
  const [imagePreview, setImagePreview] = useState("/service.png");

  const bannerId = match.params.id;

  useEffect(() => {
    if (bannerDetail && bannerDetail._id !== bannerId) {
      dispatch(getBannerDetails(bannerId));
    } else {
      setWe(bannerDetail.we);
      setCreate(bannerDetail.create);
      setAwesome(bannerDetail.awesome);
      setImage(bannerDetail.image.url);
    }

    if (error) {
      dispatch(clearErrors());
    }

    if (updateError) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history.push("/");
      dispatch({ type: UPDATE_BANNER_RESET });
    }
  }, [
    dispatch,
    error,
    history,
    isUpdated,
    updateError,
    bannerId,
    bannerDetail,
  ]);

  const updateBannerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("we", we);
    myForm.set("create", create);
    myForm.set("awesome", awesome);
    myForm.set("image", image);
    dispatch(updateBanner(bannerId, myForm));
  };

  const updateBannerImageChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title="Update Banner - Admin Panel" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateBannerSubmitHandler}
          >
            <h1>Update Banner</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Title Name"
                required
                value={we}
                onChange={(e) => setWe(e.target.value)}
              />
            </div>
            <div>
              <InfoIcon />
              <input
                type="text"
                placeholder="Button Text"
                required
                value={create}
                onChange={(e) => setCreate(e.target.value)}
              />
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Service"
                required
                value={awesome}
                onChange={(e) => setAwesome(e.target.value)}
                rows="4"
                cols="12"
              />
            </div>

            <div id="createProductFormFile">
              <div className="admin__web">
                <img src={image} alt="image Preview" className="admin_icon" />
              </div>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                onChange={updateBannerImageChange}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateBanner;
