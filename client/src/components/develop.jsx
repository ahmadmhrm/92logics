import React, { useEffect } from "react";
import { Link } from "react-tiger-transition";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/userAction";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteWeb } from "../actions/webAction";
import { DELETE_WEB_RESET } from "../constants/webConstant";
import Loader from "../components/loader";

const Develop = ({ web }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isDeleted, loading } = useSelector((state) => state.web);

  if (error) {
    swal({
      title: "Error Found!",
      text: error,
      icon: "error",
      button: "Okay",
    });
  }

  if (isDeleted) {
    dispatch({ type: DELETE_WEB_RESET });
    swal({
      title: "Service Deleted Successfully!",
      icon: "success",
      button: "Okay",
    });
  }

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, error, isDeleted]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="serviceslide">
          <div className="service-content">
            <div className="service-img">
              <img src={web.icon.url} />
            </div>
            <div className="service-detail">
              <h2>{web.title}</h2>
              <p>{web.message}</p>
              <br />
              <br />
              <div className="service_action">
                <div className="c_more_btn">
                  <Link
                    to="/contact"
                    transition="glide-left"
                    className="c_more_link"
                  >
                    {web.btn}
                  </Link>
                </div>
                {user && user.role === "admin" ? (
                  <>
                    <Link to={`/admin/new-service`}>
                      <IconButton style={{ color: "#fff" }}>
                        <AddCircleIcon />
                      </IconButton>
                    </Link>
                    <Link to={`/admin/update-service/${web._id}`}>
                      <IconButton style={{ color: "#fff" }}>
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      style={{ color: "#F04F54" }}
                      onClick={() => dispatch(deleteWeb(web._id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Develop;
