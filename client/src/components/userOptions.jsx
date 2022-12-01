import { useState } from "react";
import "../css/userOptions.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
// icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../actions/userAction";
import { useDispatch } from "react-redux";

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Projects", func: projects },
    { icon: <PersonIcon />, name: "Profile", func: profile },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    history.push("/admin/dashboard");
  }

  function projects() {
    history.push("/admin/projects");
  }

  function profile() {
    history.push("/profile");
  }

  function logoutUser() {
    dispatch(logout());
    history.push("/");
    alert.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/user.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
