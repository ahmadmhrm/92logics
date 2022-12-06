import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import EmojiSymbolsIcon from "@material-ui/icons/EmojiSymbols";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import { CREATE_SKILL_RESET } from "../constants/skillConstant";
import { clearErrors, skillContent } from "../actions/skillAction";

const NewSkill = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newSkill);

  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");

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
        title: "Skill Created Successfully!",
        icon: "success",
        button: "Okay",
      });
      history.push("/about");
      dispatch({ type: CREATE_SKILL_RESET });
    }
  }, [dispatch, error, history, success]);

  const skillSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("percent", percent);
    dispatch(skillContent(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Skill - Admin Panel" />
      <Navbar />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={skillSubmitHandler}
          >
            <h1>Add Skill</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Skill Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <EmojiSymbolsIcon />
              <input
                type="number"
                placeholder="Skill Percent"
                required
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
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

export default NewSkill;
