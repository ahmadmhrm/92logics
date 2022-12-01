import React, { Fragment, useEffect, useState } from "react";
import "../css/newProject.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../components/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import EmojiSymbolsIcon from "@material-ui/icons/EmojiSymbols";
import Sidebar from "../components/sidebar";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import { UPDATE_SKILL_RESET } from "../constants/skillConstant";
import {
  updateSkill,
  clearErrors,
  getSkillDetails,
} from "../actions/skillAction";

const UpdateSkill = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { error, skillDetail } = useSelector((state) => state.skillDetails);

  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.skill);

  const [name, setName] = useState("");
  const [percent, setPercent] = useState("");

  const skillId = match.params.id;

  useEffect(() => {
    if (skillDetail && skillDetail._id !== skillId) {
      dispatch(getSkillDetails(skillId));
    } else {
      setName(skillDetail.name);
      setPercent(skillDetail.percent);
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Skill Update Successfully");
      history.push("/about");
      dispatch({ type: UPDATE_SKILL_RESET });
    }
  }, [
    dispatch,
    alert,
    history,
    error,
    isUpdated,
    updateError,
    skillDetail,
    skillId,
  ]);

  const updateSkillSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("percent", percent);
    dispatch(updateSkill(skillId, myForm));
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
            onSubmit={updateSkillSubmitHandler}
          >
            <h1>Update Skill</h1>

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
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
export default UpdateSkill;
