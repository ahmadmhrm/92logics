import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getWebDetails, updateWeb } from "../actions/webAction";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import InfoIcon from "@material-ui/icons/Info";
import Sidebar from "../components/sidebar";
import { UPDATE_WEB_RESET } from "../constants/webConstant";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";

const UpdateWeb = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, webDetail } = useSelector((state) => state.webDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.web);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [btn, setBtn] = useState("");
  const [icon, setIcon] = useState("/service.png");
  const [iconPreview, setIconPreview] = useState("");

  const webId = match.params.id;

  useEffect(() => {
    if (webDetail && webDetail._id !== webId) {
      dispatch(getWebDetails(webId));
    } else {
      setTitle(webDetail.title);
      setMessage(webDetail.message);
      setBtn(webDetail.btn);
      setIcon(webDetail.icon.url);
    }

    if (error) {
      swal({
        title: "Error Found!",
        text: error,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
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
        title: "Service Updated Successfully!",
        icon: "success",
        button: "Okay",
      });
      history.push("/website-design-and-development");
      dispatch({ type: UPDATE_WEB_RESET });
    }
  }, [dispatch, error, history, isUpdated, updateError, webId, webDetail]);

  const updateWebSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("message", message);
    myForm.set("btn", btn);
    myForm.set("icon", icon);
    dispatch(updateWeb(webId, myForm));
  };

  const updateWebIconChange = (e) => {
    if (e.target.name === "icon") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setIconPreview(reader.result);
          setIcon(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title="Update Service - Admin Panel" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateWebSubmitHandler}
          >
            <h1>Update Service</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Title Name"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <InfoIcon />
              <input
                type="text"
                placeholder="Button Text"
                required
                value={btn}
                onChange={(e) => setBtn(e.target.value)}
              />
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Service"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                cols="12"
              />
            </div>

            <div id="createProductFormFile">
              <div className="admin__web">
                <img src={icon} alt="image Preview" className="admin_icon" />
              </div>
              <input
                type="file"
                name="icon"
                accept="image/*"
                required
                onChange={updateWebIconChange}
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

export default UpdateWeb;
