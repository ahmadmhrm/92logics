import React, { useState, useEffect } from "react";
import "../css/signup.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-tiger-transition";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../components/loader";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="signup">
          <MetaData title="92 logics - login" />
          <Navbar />
          <div className="signup-form">
            <h2 className="signup-title">Sign In</h2>
            <form onSubmit={loginSubmit}>
              <div className="signup-fields">
                <div className="signup-group">
                  <input
                    type="email"
                    className="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="signup-group">
                  <input
                    type="password"
                    className="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="forgot__pass">
                  <Link to="/" className="forgot_text" transition="scale">
                    forgot password?
                  </Link>
                </div>
              </div>
              <input
                type="submit"
                value="Login"
                className="signup-submit-button"
              />
              <div className="account__suggestion">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    transition="glide-right"
                    className="sugg__link"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
