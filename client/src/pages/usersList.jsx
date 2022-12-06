import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../css/projectsList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import MetaData from "../components/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { DELETE_USER_RESET } from "../constants/userConstant";
import { getAllUsers, clearErrors, deleteUser } from "../actions/userAction";

const UsersList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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

    if (deleteError) {
      swal({
        title: "Error Found!",
        text: deleteError,
        icon: "error",
        button: "Okay",
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      swal({
        title: "User Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, history, deleteError, isDeleted, message]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.2,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton
              style={{ color: "#F04F54" }}
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  return (
    <>
      <MetaData title={`All users - Admin Panel`} />
      <Navbar />
      <div className="projectsList">
        <div className="admin_projects_sidebar">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className="productListContainer">
          <h1 className="productListHeading">All Users</h1>
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

export default UsersList;
