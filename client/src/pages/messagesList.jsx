import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../css/projectsList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getMessages,
  deleteMessage,
} from "../actions/contactAction";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import MetaData from "../components/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { DELETE_MESSAGE_RESET } from "../constants/contactConstant";

const MessagesList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [sidebar, setSidebar] = useState(false);

  const { error, messages } = useSelector((state) => state.messages);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.contact
  );

  const deleteMessageHandler = (id) => {
    dispatch(deleteMessage(id));
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
        title: "Message Deleted Successfully!",
        icon: "success",
        button: "Okay",
      });
      dispatch({ type: DELETE_MESSAGE_RESET });
    }

    dispatch(getMessages());
  }, [dispatch, error, history, deleteError, isDeleted]);

  const columns = [
    {
      field: "fname",
      headerName: "First Name",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "message",
      headerName: "Message",
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
            <IconButton
              style={{ color: "#F04F54" }}
              onClick={() =>
                deleteMessageHandler(params.getValue(params.id, "id"))
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

  messages &&
    messages.forEach((item) => {
      rows.push({
        id: item._id,
        fname: item.fname,
        lname: item.lname,
        email: item.email,
        phone: item.phone,
        message: item.message,
      });
    });

  return (
    <>
      <MetaData title={`All Messages - Admin Panel`} />
      <Navbar />
      <div className="projectsList">
        <div className="admin_projects_sidebar">
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className="productListContainer">
          <h1 className="productListHeading">Inbox</h1>
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

export default MessagesList;
