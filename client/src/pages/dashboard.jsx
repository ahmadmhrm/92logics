import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import "../css/dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Navbar from "../components/navbar";
import MetaData from "../components/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getAllAdminProjects } from "../actions/projectAction";
import { getAllUsers } from "../actions/userAction";
import { getMessages } from "../actions/contactAction";
import { getReviews } from "../actions/reviewAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);
  const { projects } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.allUsers);
  const { reviews } = useSelector((state) => state.allreviews);
  const { messages } = useSelector((state) => state.messages);

  const doughnutState = {
    labels: ["Users", "Admins"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [users.length, 1],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAllAdminProjects());
    dispatch(getAllUsers());
    dispatch(getReviews());
    dispatch(getMessages());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <Navbar />
      <MetaData title="Dashboard - Admin Panel" />
      <div className="admin_sidebar">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </div>

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="menu_button">
          <span>Open Admin Sidebar</span>&nbsp; &nbsp;
          <i
            className="fa-solid fa-bars"
            onClick={() => setSidebar(!sidebar)}
          ></i>
        </div>

        <div className="dashboardSummary">
          <div>
            <p>
              {users && users.length}
              <br />
              Total Clients
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/projects">
              <p>{projects && projects.length}</p>
              <p>Projects</p>
            </Link>

            <Link to="/admin/users">
              <p>{users && users.length}</p>
              <p>Users</p>
            </Link>
            <Link to="/admin/inbox">
              <p>{messages && messages.length}</p>
              <p>Messages</p>
            </Link>
          </div>
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
