import React, { useEffect } from "react";
import "../css/about.css";
import "react-tiger-transition/styles/main.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getMessage,
  deleteAboutContent,
} from "../actions/aboutMessageAction";
import { getTechContent, deleteTechContent } from "../actions/techAction";
import { getAllReason, deleteReason } from "../actions/reasonAction";
import { getAllFeatures, deleteFeature } from "../actions/featureAction";
import { getAllSkills, deleteSkill } from "../actions/skillAction";
import { getAllFaqs, deleteFaq } from "../actions/faqAction";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { loadUser } from "../actions/userAction";
import { Link } from "react-router-dom";
import Loader from "../components/loader";
import { DELETE_REASON_RESET } from "../constants/reasonConstant";
import { DELETE_FEATURE_RESET } from "../constants/featureConstant";
import { DELETE_SKILL_RESET } from "../constants/skillConstant";
import { DELETE_FAQ_RESET } from "../constants/faqConstant";
import { DELETE_ABOUT_MESSAGE_RESET } from "../constants/aboutMessageConstant";
import { DELETE_TECH_CONTENT_RESET } from "../constants/techConstant";
import Progress from "./progress";
import { useState } from "react";

const About = ({ className }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const togleAccordition = (index) => {
    if (index === toggle) {
      setToggle(-1);
      return;
    }
    setToggle(index);
  };

  const { loading, error, aboutMessages } = useSelector(
    (state) => state.message
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.reason
  );

  const { error: featureDeleteError, isDeleted: featureIsDeleted } =
    useSelector((state) => state.feature);

  const { error: skillDeleteError, isDeleted: skillIsDeleted } = useSelector(
    (state) => state.skill
  );

  const { error: faqDeleteError, isDeleted: faqIsDeleted } = useSelector(
    (state) => state.faq
  );

  const { error: messageDeleteError, isDeleted: messageIsDeleted } =
    useSelector((state) => state.uMessage);

  const { error: techDeleteError, isDeleted: techIsDeleted } = useSelector(
    (state) => state.updateTechContent
  );

  const { technology } = useSelector((state) => state.getTechContent);
  const { reasons } = useSelector((state) => state.allReasons);
  const { features } = useSelector((state) => state.allFeature);
  const { skills } = useSelector((state) => state.allSkill);
  const { faqs } = useSelector((state) => state.allFaq);

  const { user } = useSelector((state) => state.user);

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

    if (deleteError) {
      swal({
        title: "Error Found!",
        text: deleteError,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (featureDeleteError) {
      swal({
        title: "Error Found!",
        text: featureDeleteError,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (skillDeleteError) {
      swal({
        title: "Error Found!",
        text: skillDeleteError,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (faqDeleteError) {
      swal({
        title: "Error Found!",
        text: faqDeleteError,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (messageDeleteError) {
      swal({
        title: "Error Found!",
        text: messageDeleteError,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (techDeleteError) {
      swal({
        title: "Error Found!",
        text: techDeleteError,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      swal({
        title: "Reason Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_REASON_RESET });
    }

    if (featureIsDeleted) {
      swal({
        title: "Feature Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_FEATURE_RESET });
    }

    if (skillIsDeleted) {
      swal({
        title: "Skill Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_SKILL_RESET });
    }

    if (faqIsDeleted) {
      swal({
        title: "FAQ Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_FAQ_RESET });
    }

    if (messageIsDeleted) {
      swal({
        title: "Content Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_ABOUT_MESSAGE_RESET });
    }

    if (techIsDeleted) {
      swal({
        title: "Content Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_TECH_CONTENT_RESET });
    }

    dispatch(loadUser());
    dispatch(getMessage());
    dispatch(getTechContent());
    dispatch(getAllReason());
    dispatch(getAllFeatures());
    dispatch(getAllSkills());
    dispatch(getAllFaqs());
  }, [
    dispatch,
    error,
    deleteError,
    history,
    isDeleted,
    featureDeleteError,
    featureIsDeleted,
    skillDeleteError,
    skillIsDeleted,
    faqIsDeleted,
    faqDeleteError,
    messageDeleteError,
    messageIsDeleted,
    techDeleteError,
    techIsDeleted,
  ]);
  return (
    <>
      <div className={className}>
        <h2 className="about__title">About Us</h2>
        <div className="about__content">
          <div className="about__left">
            <div className="about-text">
              {aboutMessages &&
                aboutMessages.map((message) => {
                  return (
                    <>
                      {loading ? (
                        <Loader />
                      ) : (
                        <p className="about__main__content" key={message._id}>
                          <b>
                            {message.address}
                            {user && user.role === "admin" ? (
                              <>
                                <Link
                                  to={`/admin/update-content/${message._id}`}
                                >
                                  <IconButton>
                                    <EditIcon />
                                  </IconButton>
                                </Link>
                                <IconButton
                                  style={{ color: "#F04F54" }}
                                  onClick={() =>
                                    dispatch(deleteAboutContent(message._id))
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            ) : null}
                          </b>
                          <br />
                          {message.message}
                          <br />
                          <b>Managing Director</b>
                          <br />
                          <b>{message.directorName}</b>
                        </p>
                      )}
                    </>
                  );
                })}

              <br />
              <br />
              <div className="about-list">
                <h4>
                  Some important Feature
                  {user && user.role === "admin" ? (
                    <Link to={`admin/new-feature`}>
                      <IconButton>
                        <AddCircleIcon />
                      </IconButton>
                    </Link>
                  ) : null}
                </h4>
                <ul>
                  {features &&
                    features.map((item) => {
                      return (
                        <li key={item._id}>
                          <i className="fa fa-check-square"></i>&nbsp;
                          {item.feature}
                          {user && user.role === "admin" ? (
                            <>
                              <Link to={`/admin/update-feature/${item._id}`}>
                                <IconButton>
                                  <EditIcon />
                                </IconButton>
                              </Link>
                              <IconButton
                                style={{ color: "#F04F54" }}
                                onClick={() =>
                                  dispatch(deleteFeature(item._id))
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          ) : null}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="about__right">
            <div className="about-list">
              <h4>
                Reasons to Hire Dedicated Developers
                {user && user.role === "admin" ? (
                  <Link to={`admin/new-reason`}>
                    <IconButton>
                      <AddCircleIcon />
                    </IconButton>
                  </Link>
                ) : null}
              </h4>
              <ul>
                {reasons &&
                  reasons.map((item) => {
                    return (
                      <li key={item._id}>
                        <i className="fa fa-check-square"></i>&nbsp;&nbsp;
                        {item.reason}
                        {user && user.role === "admin" ? (
                          <>
                            <Link to={`/admin/update-reason/${item._id}`}>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <IconButton
                              style={{ color: "#F04F54" }}
                              onClick={() => dispatch(deleteReason(item._id))}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : null}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <br />
            <br />
            <div className="about-special">
              {technology &&
                technology.map((item) => {
                  return (
                    <p key={item._id}>
                      <b>
                        Technologies
                        {user && user.role === "admin" ? (
                          <>
                            <Link to={`/admin/update-tech-content/${item._id}`}>
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <IconButton
                              style={{ color: "#F04F54" }}
                              onClick={() =>
                                dispatch(deleteTechContent(item._id))
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        ) : null}
                      </b>
                      <br />
                      {item.techContent}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="bottom_content">
          <div className="skills">
            <div className="admin__skills">
              Skills
              {user && user.role === "admin" ? (
                <Link to={`/admin/new-skill`}>
                  <IconButton>
                    <AddCircleIcon />
                  </IconButton>
                </Link>
              ) : null}
            </div>
            {skills &&
              skills.map((item) => {
                return (
                  <div key={item._id}>
                    <h2>{item.name}</h2>
                    <Progress done={item.percent} />
                    {user && user.role === "admin" ? (
                      <>
                        <Link to={`/admin/update-skill/${item._id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          style={{ color: "#F04F54" }}
                          onClick={() => dispatch(deleteSkill(item._id))}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : null}
                  </div>
                );
              })}
          </div>
          <div className="accordions">
            <div className="admin__faq">
              FAQ's
              {user && user.role === "admin" ? (
                <Link to={`/admin/new-faq`}>
                  <IconButton>
                    <AddCircleIcon />
                  </IconButton>
                </Link>
              ) : null}
            </div>
            {faqs &&
              faqs.map((item, index) => {
                return (
                  <>
                    {user && user.role === "admin" ? (
                      <>
                        <Link to={`/admin/update-faq/${item._id}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton
                          style={{ color: "#F04F54" }}
                          onClick={() => dispatch(deleteFaq(item._id))}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : null}
                    <ul id="accordion">
                      <li key={item._id} className="acc_list">
                        <div
                          className="acc_title"
                          onClick={() => togleAccordition(index)}
                        >
                          {item.title}
                          <span
                            className={
                              toggle === index
                                ? "acc_arrow active"
                                : "acc_arrow"
                            }
                          >
                            &#x3e;
                          </span>
                        </div>
                        <div
                          className={
                            toggle === index ? "content active" : "content"
                          }
                        >
                          <p>{item.message}</p>
                        </div>
                      </li>
                    </ul>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
