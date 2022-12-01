import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getReviewDetails,
  updateReview,
} from "../actions/reviewAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import LinkIcon from "@material-ui/icons/Link";
import HomeIcon from "@material-ui/icons/Home";
import Sidebar from "../components/sidebar";
import { UPDATE_REVIEW_RESET } from "../constants/reviewConstant";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";

const UpdateReview = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { error, review } = useSelector((state) => state.reviewDetails);
  const {
    loading,
    error: reviewError,
    isUpdated,
  } = useSelector((state) => state.review);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("/user.png");
  const [avatarPreview, setImagePreview] = useState("");

  const reviewId = match.params.id;

  useEffect(() => {
    if (review && review._id !== reviewId) {
      dispatch(getReviewDetails(reviewId));
    } else {
      setName(review.name);
      setLocation(review.location);
      setComment(review.comment);
      setImage(review.image.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Review Updated Successfully");
      history.push("");
      dispatch({ type: UPDATE_REVIEW_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    reviewError,
    reviewId,
    review,
  ]);

  const updateReviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("location", location);
    myForm.set("comment", comment);
    myForm.set("image", image);
    dispatch(updateReview(reviewId, myForm));
  };

  const updateReviewImagesChange = (e) => {
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
      <MetaData title="Update Project - Admin Panel" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateReviewSubmitHandler}
          >
            <h1>Update Review</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <textarea
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                cols="10"
                rows="5"
              />
            </div>

            <div id="createProductFormFile">
              <img
                src={image}
                alt="image Preview"
                style={{
                  width: "55px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                onChange={updateReviewImagesChange}
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

export default UpdateReview;
