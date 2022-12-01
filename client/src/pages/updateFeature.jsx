import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import { UPDATE_FEATURE_RESET } from "../constants/featureConstant";
import {
  updateFeatureContent,
  clearErrors,
  getFeatureDetails,
} from "../actions/featureAction";

const UpdateFeature = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { error, featureDetail } = useSelector((state) => state.featureDetails);

  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.feature);

  const [feature, setFeature] = useState("");

  const featureId = match.params.id;

  useEffect(() => {
    if (featureDetail && featureDetail._id !== featureId) {
      dispatch(getFeatureDetails(featureId));
    } else {
      setFeature(featureDetail.feature);
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Content Update Successfully");
      history.push("/about");
      dispatch({ type: UPDATE_FEATURE_RESET });
    }
  }, [
    dispatch,
    alert,
    history,
    error,
    isUpdated,
    updateError,
    featureDetail,
    featureId,
  ]);

  const updateContentSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("feature", feature);
    dispatch(updateFeatureContent(featureId, myForm));
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
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                rows="6"
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
export default UpdateFeature;
