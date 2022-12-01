import React, { useEffect } from "react";
import { Link } from "react-tiger-transition";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../actions/userAction";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteMigration } from "../actions/migrationAction";
import { DELETE_MIGRATION_RESET } from "../constants/migrationConstant";
import { useAlert } from "react-alert";

const Migration = ({ migration }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error, isDeleted } = useSelector((state) => state.migration);

  if (error) {
    alert.error(error);
  }

  if (isDeleted) {
    dispatch({ type: DELETE_MIGRATION_RESET });
    alert.success("Migration Deleted Successfylly");
  }

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, error, isDeleted, alert]);
  return (
    <>
      <div className="serviceslide">
        <div className="service-content">
          <div className="service-img">
            <img src={migration.icon.url} />
          </div>
          <div className="service-detail">
            <h2>{migration.title}</h2>
            <p>{migration.message}</p>
            <br />
            <br />
            <div className="service_action">
              <div className="c_more_btn">
                <Link
                  to="/contact"
                  transition="glide-left"
                  className="c_more_link"
                >
                  {migration.btn}
                </Link>
              </div>
              {user && user.role === "admin" ? (
                <>
                  <Link to={`/admin/new-migration`}>
                    <IconButton style={{ color: "#fff" }}>
                      <AddCircleIcon />
                    </IconButton>
                  </Link>
                  <Link to={`/admin/update-migration/${migration._id}`}>
                    <IconButton style={{ color: "#fff" }}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    style={{ color: "#F04F54" }}
                    onClick={() => dispatch(deleteMigration(migration._id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Migration;
