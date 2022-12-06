import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import { UPDATE_FAQ_RESET } from "../constants/faqConstant";
import { updateFaq, clearErrors, getFaqDetails } from "../actions/faqAction";

const UpdateFaq = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, faqDetail } = useSelector((state) => state.faqDetails);

  if (error) {
    swal({
      title: "Error Found!",
      text: error,
      icon: "error",
      button: "Okay",
    });
    dispatch(clearErrors());
  }

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.faq);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const faqId = match.params.id;

  useEffect(() => {
    if (faqDetail && faqDetail._id !== faqId) {
      dispatch(getFaqDetails(faqId));
    } else {
      setTitle(faqDetail.title);
      setMessage(faqDetail.message);
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
        title: "Faq's Updated Successfully!",
        icon: "success",
        button: "Okay",
      });
      history.push("/about");
      dispatch({ type: UPDATE_FAQ_RESET });
    }
  }, [
    dispatch,
    alert,
    history,
    error,
    isUpdated,
    updateError,
    faqDetail,
    faqId,
  ]);

  const updatefaqSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);
    myForm.set("message", message);
    dispatch(updateFaq(faqId, myForm));
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
            onSubmit={updatefaqSubmitHandler}
          >
            <h1>Update Faq's</h1>

            <div>
              <SpellcheckIcon />

              <input
                type="text"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="6"
                cols="12"
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
export default UpdateFaq;
