import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import PersonIcon from "@material-ui/icons/Person";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import {
  clearErrors,
  updateAboutContent,
  getContentDetails,
} from "../actions/aboutMessageAction";
import { UPDATE_ABOUT_MESSAGE_RESET } from "../constants/aboutMessageConstant";

const UpdateAboutMessage = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error, content } = useSelector((state) => state.content);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.uMessage);

  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [directorName, setDirectorName] = useState("");

  const contentId = match.params.id;

  useEffect(() => {
    if (content && content._id !== contentId) {
      dispatch(getContentDetails(contentId));
    } else {
      setAddress(content.address);
      setMessage(content.message);
      setDirectorName(content.directorName);
    }
    if (updateError) {
      swal({
        title: "Error Found!",
        text: updateError,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal({
        title: "Content Updated Successfully!",
        icon: "success",
        button: "Okay",
      });
      history.push("/about");
      dispatch({ type: UPDATE_ABOUT_MESSAGE_RESET });
    }
  }, [dispatch, error, history, isUpdated, updateError, content, contentId]);

  const updateMessageSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("address", address);
    myForm.set("message", message);
    myForm.set("directorName", directorName);
    dispatch(updateAboutContent(contentId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update Content - Admin Panel" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateMessageSubmitHandler}
          >
            <h1>Update Content</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <PersonIcon />

              <input
                type="text"
                placeholder="Director Name"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
              />
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Content"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                cols="50"
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

export default UpdateAboutMessage;
