import React from "react";
import "../css/sidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { useHistory } from "react-router-dom";

const Sidebar = ({ sidebar }) => {
  const history = useHistory();
  return (
    <div className={`sidebar ${sidebar ? "sidebar active" : "sidebar"}`}>
      <div className="admin_logo" onClick={() => history.push("/")}>
        92 logics
      </div>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>

      {/* projects */}
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Projects">
            <Link to="/admin/projects">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/project">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      {/* services */}
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Services">
            <Link to="/services">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/new-service">
              <TreeItem nodeId="2" label="Create Website" icon={<AddIcon />} />
            </Link>
            <Link to="/admin/new-migration">
              <TreeItem
                nodeId="2"
                label="Create Migration"
                icon={<AddIcon />}
              />
            </Link>
            <Link to="/admin/new-database">
              <TreeItem nodeId="2" label="Create Database" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      {/* about */}
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="About Us">
            <Link to="/about">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/new-content">
              <TreeItem nodeId="3" label="Work" icon={<AddIcon />} />
            </Link>

            <Link to="/admin/tech-content">
              <TreeItem nodeId="3" label="Technology" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
    </div>
  );
};

export default Sidebar;
