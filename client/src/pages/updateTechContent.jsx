import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import { UPDATE_TECH_CONTENT_RESET } from "../constants/techConstant";
import {
  updateTechContent,
  clearErrors,
  getTechContentDetails,
} from "../actions/techAction";

const UpdateTechContent = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { error, contentDetail } = useSelector(
    (state) => state.techContentDetail
  );

  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateTechContent);

  const [techContent, setTechContent] = useState("");

  const contentId = match.params.id;

  useEffect(() => {
    if (contentDetail && contentDetail._id !== contentId) {
      dispatch(getTechContentDetails(contentId));
    } else {
      setTechContent(contentDetail.techContent);
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Content Update Successfully");
      history.push("/about");
      dispatch({ type: UPDATE_TECH_CONTENT_RESET });
    }
  }, [
    dispatch,
    alert,
    history,
    error,
    isUpdated,
    updateError,
    contentDetail,
    contentId,
  ]);

  const updateContentSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("techContent", techContent);
    dispatch(updateTechContent(contentId, myForm));
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
            onSubmit={updateContentSubmitHandler}
          >
            <h1>Update Content</h1>

            <div>
              <textarea
                type="text"
                placeholder="Content"
                required
                value={techContent}
                onChange={(e) => setTechContent(e.target.value)}
                rows="8"
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
export default UpdateTechContent;
