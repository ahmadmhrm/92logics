import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import { CREATE_REASON_RESET } from "../constants/reasonConstant";
import { clearErrors, reasonContent } from "../actions/reasonAction";

const NewReason = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newReason);

  const [reason, setReason] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Content Created Successfully");
      history.push("/about");
      dispatch({ type: CREATE_REASON_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const reasonSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("reason", reason);
    dispatch(reasonContent(myForm));
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
            onSubmit={reasonSubmitHandler}
          >
            <h1>Add Content</h1>
            <div>
              <textarea
                placeholder="Content"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="5"
                cols="80"
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

export default NewReason;
