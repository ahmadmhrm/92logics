import React, { useEffect } from "react";
import { Link } from "react-tiger-transition";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/userAction";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteDatabase } from "../actions/databaseAction";
import { DELETE_DATABASE_RESET } from "../constants/databaseConstant";
import Loader from "../components/loader";

const Database = ({ database }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { error, isDeleted, loading } = useSelector((state) => state.database);

  if (error) {
    swal({
      title: "Error Found!",
      text: error,
      icon: "error",
      button: "Okay",
    });
  }

  if (isDeleted) {
    swal({
      title: "Service Deleted Successfully!",
      icon: "success",
      button: "Okay",
    });
    dispatch({ type: DELETE_DATABASE_RESET });
  }

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, error, isDeleted, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="serviceslide">
          <div className="service-content">
            <div className="service-img">
              <img src={database.icon.url} />
            </div>
            <div className="service-detail">
              <h2>{database.title}</h2>
              <p>{database.message}</p>
              <br />
              <br />
              <div className="service_action">
                <div className="c_more_btn">
                  <Link
                    to="/contact"
                    transition="glide-left"
                    className="c_more_link"
                  >
                    {database.btn}
                  </Link>
                </div>
                {user && user.role === "admin" ? (
                  <>
                    <Link to={`/admin/new-database`}>
                      <IconButton style={{ color: "#fff" }}>
                        <AddCircleIcon />
                      </IconButton>
                    </Link>
                    <Link to={`/admin/update-database/${database._id}`}>
                      <IconButton style={{ color: "#fff" }}>
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      style={{ color: "#fff" }}
                      onClick={() => dispatch(deleteDatabase(database._id))}
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

export default Database;
