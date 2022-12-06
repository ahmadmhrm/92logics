import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import { UPDATE_REASON_RESET } from "../constants/reasonConstant";
import {
  updateReason,
  clearErrors,
  getReasonDetails,
} from "../actions/reasonAction";

const UpdateReason = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { error, reasonDetail } = useSelector((state) => state.reasonDetail);

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
  } = useSelector((state) => state.reason);

  const [reason, setReason] = useState("");

  const reasonId = match.params.id;

  useEffect(() => {
    if (reasonDetail && reasonDetail._id !== reasonId) {
      dispatch(getReasonDetails(reasonId));
    } else {
      setReason(reasonDetail.reason);
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
      dispatch({ type: UPDATE_REASON_RESET });
    }
  }, [
    dispatch,
    alert,
    history,
    error,
    isUpdated,
    updateError,
    reasonDetail,
    reasonId,
  ]);

  const updateContentSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("reason", reason);
    dispatch(updateReason(reasonId, myForm));
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
                value={reason}
                onChange={(e) => setReason(e.target.value)}
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
export default UpdateReason;
