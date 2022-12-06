import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProject } from "../actions/projectAction";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import LanguageIcon from "@material-ui/icons/Language";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import LinkIcon from "@material-ui/icons/Link";
import Sidebar from "../components/sidebar";
import { NEW_PROJECT_RESET } from "../constants/projectConstant";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const NewProject = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newProject);

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("/project.png");
  const [avatarPreview, setImagePreview] = useState("/project.png");

  const categories = ["Web App", "Mobile App", "Database"];

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
        title: "Product created Successfully!",
        icon: "success",
        button: "Okay",
      });
      history.push("/admin/projects");
      dispatch({ type: NEW_PROJECT_RESET });
    }
  }, [dispatch, swal, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("link", link);
    myForm.set("projectUrl", projectUrl);
    myForm.set("category", category);
    myForm.set("image", image);
    dispatch(createProject(myForm));
  };

  const createProductImagesChange = (e) => {
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
      <MetaData title="Create Product" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <LinkIcon />
              <input
                type="text"
                placeholder="www.address.com"
                required
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div>
              <LanguageIcon />

              <input
                placeholder="https://www.address.com"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
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
                onChange={createProductImagesChange}
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

export default NewProject;
