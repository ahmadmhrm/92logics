import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import { CREATE_FEATURE_RESET } from "../constants/featureConstant";
import { clearErrors, featureContent } from "../actions/featureAction";

const NewFeature = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newFeature);

  const [feature, setFeature] = useState("");

  useEffect(() => {
    if (error) {
      swal({
        title: "Error Found!",
        text: error,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (success) {
      swal({
        title: "Content Created Successfully!",
        icon: "success",
        button: "Okay",
      });
      history.push("/about");
      dispatch({ type: CREATE_FEATURE_RESET });
    }
  }, [dispatch, error, history, success]);

  const reasonSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("feature", feature);
    dispatch(featureContent(myForm));
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
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
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

export default NewFeature;
