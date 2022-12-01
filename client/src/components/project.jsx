import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../constants/reviewConstant";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, newReview } from "../actions/reviewAction";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

const Project = ({ project }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("/user.png");
  const [ImagePreview, setImagePreview] = useState("/user.png");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const { loading, error, success } = useSelector((state) => state.newReview);

  const createReviewSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("location", location);
    myForm.set("comment", comment);
    myForm.set("image", image);
    dispatch(newReview(myForm));
  };

  const reviewDataChange = (e) => {
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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Created Successfully");
      history.push("/");
      dispatch({ type: NEW_REVIEW_RESET });
      setOpen(false);
    }
  }, [dispatch, success, alert, error, history]);

  return (
    <>
      <div className="single__portfolio">
        <div className="portfolio">
          <img
            className="portfolio__img"
            src={project.image.url}
            alt="project_image"
          />
          <div className="portfolio__overlay">
            <span className="add__btn" onClick={submitReviewToggle}>
              Add Review
            </span>
            <h3 className="portfolio__desc">{project.name}</h3>
            <a href={project.projectUrl} target="_blank">
              <h5 className="portfolio__link">{project.link}</h5>
            </a>
          </div>
        </div>
      </div>

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle
          style={{
            textAlign: "center",
            color: "#03a5db",
            fontFamily: "Poppins",
          }}
        >
          Submit Review
        </DialogTitle>
        <DialogContent className="submitDialog">
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            style={{ width: "100%" }}
            required
          />
          <br />
          <br />
          <TextField
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            style={{ width: "100%" }}
            required
          />
          <br />
          <br />
          <textarea
            style={{ width: "98%" }}
            placeholder="Comment"
            className="submitDialogTextArea"
            cols="20"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <br />
          <br />
          <div className="review_Image">
            <img src={image} alt="Avatar Preview" />
            <input
              type="file"
              name="image"
              required
              accept="image/*"
              onChange={reviewDataChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={submitReviewToggle}
            color="secondary"
            variant="outlined"
            style={{ fontFamily: "Poppins", padding: "10px 10px" }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ fontFamily: "Poppins", padding: "10px 10px" }}
            onClick={createReviewSubmitHandler}
            disabled={loading ? true : false}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Project;
