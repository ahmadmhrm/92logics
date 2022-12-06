import React, { useState, useEffect } from "react";
import "../css/ourclients.css";
import Client from "./client";
// svgs
import Twitter from "../svgs/twitter.svg";
import skype from "../svgs/skype.svg";
import Linkedin from "../svgs/linkedin.svg";
import Facebook from "../svgs/facebook.svg";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getReviews } from "../actions/reviewAction";
import Loader from "./loader";
import Pagination from "react-js-pagination";

const Ourclients = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { reviews, loading, error, reviewsCount, resultPerPage } = useSelector(
    (state) => state.allreviews
  );

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

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
    dispatch(getReviews(currentPage));
  }, [dispatch, error, currentPage]);
  return (
    <>
      <div className="our-client">
        <h2>our clients</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="client-boxes">
            {reviews &&
              reviews.map((review) => (
                <Client review={review} key={review._id} />
              ))}
          </div>
        )}
        {resultPerPage < reviewsCount && (
          <div className="client__paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={reviewsCount}
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
        <br />
        <br />

        <div className="fot-social">
          <ul>
            <li>
              <a href="skype:qaiser.mehmood?userinfo">
                <img src={skype} className="fot_icon" alt="92logics at skype" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/92logicsPK" target="_blank">
                <img
                  src={Linkedin}
                  className="fot_icon"
                  alt="92logics at Linkedin"
                />
              </a>
            </li>

            <li>
              <a href="https://twitter.com/92logicsPK" target="_blank">
                <img
                  src={Twitter}
                  className="fot_icon"
                  alt="92logics at Twitter"
                />
              </a>
            </li>
            <li>
              <a href="https://facebook.com/92logicsPK" target="_blank">
                <img
                  src={Facebook}
                  className="fot_icon"
                  alt="92logics at Facebook"
                />
              </a>
            </li>
          </ul>
          <p>
            Copyright © {new Date().getUTCFullYear()} 92 logics | All Rights
            Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Ourclients;
