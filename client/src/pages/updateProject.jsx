import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProjectDetails,
  updateProject,
} from "../actions/projectAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import LanguageIcon from "@material-ui/icons/Language";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import LinkIcon from "@material-ui/icons/Link";
import Sidebar from "../components/sidebar";
import { UPDATE_PROJECT_RESET } from "../constants/projectConstant";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";

const UpdateProject = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { error, project } = useSelector((state) => state.projectDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.project);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("/project.png");
  const [avatarPreview, setImagePreview] = useState("");

  const categories = ["Web App", "Mobile App", "Database"];

  const projectId = match.params.id;

  useEffect(() => {
    if (project && project._id !== projectId) {
      dispatch(getProjectDetails(projectId));
    } else {
      setName(project.name);
      setLink(project.link);
      setProjectUrl(project.projectUrl);
      setCategory(project.category);
      setImage(project.image.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Project Updated Successfully");
      history.push("/admin/projects");
      dispatch({ type: UPDATE_PROJECT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    updateError,
    projectId,
    project,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("link", link);
    myForm.set("projectUrl", projectUrl);
    myForm.set("category", category);
    myForm.set("image", image);
    dispatch(updateProject(projectId, myForm));
  };

  const updateProductImagesChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title="Update Project - Admin Panel" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Project</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Project Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <LinkIcon />
              <input
                type="text"
                placeholder="Project Link"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div>
              <LanguageIcon />

              <input
                placeholder="Project Url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div id="createProductFormFile">
              <img src={image} alt="image Preview" className="admin_image" />
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                onChange={updateProductImagesChange}
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

export default UpdateProject;
