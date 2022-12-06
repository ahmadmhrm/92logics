import React, { useEffect } from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { loadUser } from "../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DELETE_REVIEW_RESET } from "../constants/reviewConstant";
import { deleteReview } from "../actions/reviewAction";

const Client = ({ review }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { error, isDeleted } = useSelector((state) => state.review);

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

    if (isDeleted) {
      swal({
        title: "Review Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_REVIEW_RESET });
    }

    dispatch(loadUser());
  }, [dispatch, error, isDeleted, alert]);

  return (
    <>
      <div className="client-boxe">
        {user && user.role === "admin" ? (
          <>
            <Link to={`/admin/update-review/${review._id}`}>
              <IconButton style={{ color: "#fff" }}>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              style={{ color: "#F04F54" }}
              onClick={() => dispatch(deleteReview(review._id))}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : null}
        <div className="client-content">
          <p>{review.comment}</p>
          <div className="qoutes_img">
            <img src="/assets/quote.png" className="qoute_img" />
          </div>
        </div>

        <div className="client-chat">
          <div className="client-img">
            <img src={review.image.url} />
            <h1>
              {review.name}
              <p>{review.location}</p>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default Client;
