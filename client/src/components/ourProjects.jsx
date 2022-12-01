import React, { useState, useEffect } from "react";
import "../css/projects.css";
import Project from "./project";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProjects } from "../actions/projectAction";
import Loader from "./loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

const categories = ["Web App", "Mobile App", "Database"];

const OurProjects = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const { projects, loading, error, projectsCount, resultPerPage } =
    useSelector((state) => state.projects);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProjects(currentPage, category));
  }, [dispatch, error, currentPage, category]);

  return (
    <>
      <div className="featured-work">
        <h2>Our projects</h2>
        <ul className="categoryBox">
          <li className="category-link" onClick={() => dispatch(getProjects())}>
            All
          </li>
          {categories.map((category, index) => (
            <>
              <li
                className="category-link"
                key={index}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            </>
          ))}
        </ul>
        {loading ? (
          <div className="project__loader">
            <Loader />
          </div>
        ) : (
          <div className="work">
            {projects ? (
              projects.map((project) => (
                <Project project={project} key={project._id} />
              ))
            ) : (
              <h1 className="no_project">No Project Found</h1>
            )}
          </div>
        )}
        {resultPerPage < projectsCount && (
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={projectsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default OurProjects;
