import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, bannerContent } from "../actions/bannerAction";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import InfoIcon from "@material-ui/icons/Info";
import Sidebar from "../components/sidebar";
import { CREATE_BANNER_RESET } from "../constants/bannerConstant";
import { useHistory } from "react-router-dom";

const NewBanner = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newBanner);

  const [we, setWe] = useState("");
  const [create, setCreate] = useState("");
  const [awesome, setAwesome] = useState("");
  const [image, setImage] = useState("/service.png");
  const [imagePreview, setImagePreview] = useState("/service.png");

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      history.push("/");
      dispatch({ type: CREATE_BANNER_RESET });
    }
  }, [dispatch, error, history, success]);

  const createBannerSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("we", we);
    myForm.set("create", create);
    myForm.set("awesome", awesome);
    myForm.set("image", image);
    dispatch(bannerContent(myForm));
  };

  const createBannerIconChange = (e) => {
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
            onSubmit={createBannerSubmitHandler}
          >
            <h1>Create Banner</h1>

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
                placeholder="Name"
                required
                value={create}
                onChange={(e) => setCreate(e.target.value)}
              />
            </div>
            <div>
              <InfoIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={awesome}
                onChange={(e) => setAwesome(e.target.value)}
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
                onChange={createBannerIconChange}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewBanner;
