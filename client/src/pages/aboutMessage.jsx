import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import LanguageIcon from "@material-ui/icons/Language";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import { ABOUT_MESSAGE_RESET } from "../constants/aboutMessageConstant";
import { clearErrors, createAboutMessage } from "../actions/aboutMessageAction";

const AboutMessage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newMessage);

  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [directorName, setDirectorName] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Content Created Successfully");
      history.push("/about");
      dispatch({ type: ABOUT_MESSAGE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const aboutMessageSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("address", address);
    myForm.set("message", message);
    myForm.set("directorName", directorName);
    dispatch(createAboutMessage(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Content - Admin Panel" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={aboutMessageSubmitHandler}
          >
            <h1>Add Content</h1>

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
              <LanguageIcon />

              <input
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutMessage;
