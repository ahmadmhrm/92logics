import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import { CREATE_TECH_CONTENT_RESET } from "../constants/techConstant";
import { clearErrors, createTechContent } from "../actions/techAction";

const NewTechContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, success } = useSelector(
    (state) => state.newtechContent
  );

  const [techContent, setTechContent] = useState("");

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
      dispatch({ type: CREATE_TECH_CONTENT_RESET });
    }
  }, [dispatch, error, history, success]);

  const techContentSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("techContent", techContent);
    dispatch(createTechContent(myForm));
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
            onSubmit={techContentSubmitHandler}
          >
            <h1>Add Content</h1>
            <div>
              <textarea
                placeholder="Content"
                required
                value={techContent}
                onChange={(e) => setTechContent(e.target.value)}
                rows="6"
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

export default NewTechContent;
