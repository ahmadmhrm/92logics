import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../css/projectsList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllAdminProjects,
  deleteProject,
} from "../actions/projectAction";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { IconButton } from "@material-ui/core";
import MetaData from "../components/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { DELETE_PROJECT_RESET } from "../constants/projectConstant";

const ProjectsList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [sidebar, setSidebar] = useState(false);

  const { error, projects } = useSelector((state) => state.projects);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.project
  );

  const deleteProjectHandler = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Project Deleted Successfully");
      dispatch({ type: DELETE_PROJECT_RESET });
    }

    dispatch(getAllAdminProjects());
  }, [dispatch, alert, error, history, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Project ID", minWidth: 150, flex: 0.3 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "link",
      headerName: "link",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/project/${params.getValue(params.id, "id")}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton
              style={{ color: "#F04F54" }}
              onClick={() =>
                deleteProjectHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];

  projects &&
    projects.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        link: item.link,
      });
    });

  return (
    <>
      <MetaData title={`All projects - Admin Panel`} />
      <Navbar />
      <div className="projectsList">
        <div className="admin_projects_sidebar">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className="productListContainer">
          <h1 className="productListHeading">All Projects</h1>
          <div className="menu_button">
            <span>Open Admin Sidebar</span>&nbsp; &nbsp;
            <i
              className="fa-solid fa-bars"
              onClick={() => setSidebar(!sidebar)}
            ></i>
          </div>
          <br />
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsList;
