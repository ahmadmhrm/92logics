import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-tiger-transition";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import UserOptions from "../components/userOptions";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/" transition="scale" className="name">
            92 logics
          </Link>
        </div>
        {isAuthenticated && <UserOptions user={user} />}
        <div className="site-menu">
          <i className="fa-solid fa-bars bars" onClick={showSidebar}></i>
          <nav className={sidebar ? "site-menu show" : "site-menu"}>
            <ul>
              <li>
                <Button>
                  <Link to="/" className="anchor" transition="flip-left">
                    Home
                  </Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link to="/about" className="anchor" transition="flip-left">
                    About
                  </Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link
                    to="/services"
                    className="anchor"
                    transition="flip-left"
                  >
                    Services
                  </Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link to="/contact" className="anchor" transition="flip-left">
                    Contact
                  </Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link to="/login" className="anchor" transition="flip-left">
                    Login
                  </Link>
                </Button>
              </li>
              <li>
                <Button>
                  <Link to="/signup" className="anchor" transition="flip-left">
                    Signup
                  </Link>
                </Button>
              </li>
            </ul>
            <i className="fa-solid fa-xmark close" onClick={showSidebar}></i>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Navbar;
