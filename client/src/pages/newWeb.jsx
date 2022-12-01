import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, webContent } from "../actions/webAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import InfoIcon from "@material-ui/icons/Info";
import Sidebar from "../components/sidebar";
import { CREATE_WEB_RESET } from "../constants/webConstant";
import { useHistory } from "react-router-dom";

const NewWeb = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newWeb);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [btn, setBtn] = useState("");
  const [icon, setIcon] = useState("/service.png");
  const [iconPreview, setIconPreview] = useState("/service.png");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Service Created Successfully");
      history.push("/website-design-and-development");
      dispatch({ type: CREATE_WEB_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createWebSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("message", message);
    myForm.set("btn", btn);
    myForm.set("icon", icon);
    dispatch(webContent(myForm));
  };

  const createWebIconChange = (e) => {
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
      <MetaData title="Create Service" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createWebSubmitHandler}
          >
            <h1>Create Service</h1>

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
                onChange={createWebIconChange}
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

export default NewWeb;
