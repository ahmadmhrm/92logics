import React, { useState, useEffect } from "react";
import "../css/signup.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-tiger-transition";
import MetaData from "../components/MetaData";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../components/loader";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/user.png");
  const [avatarPreview, setAvatarPreview] = useState("/user.png");

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [alert, error, history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="signup">
          <MetaData title="92 logics - sign up" />
          <Navbar />
          <div className="signup-form">
            <form action="#" method="POST" onSubmit={registerSubmit}>
              <h2 className="signup-title">Sign Up</h2>
              <div className="signup-fields">
                <div className="signup-group">
                  <input
                    type="text"
                    className="name"
                    placeholder="Name"
                    required
                    value={name}
                    name="name"
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signup-group">
                  <input
                    type="email"
                    className="email"
                    placeholder="Email"
                    required
                    value={email}
                    name="email"
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signup-group">
                  <input
                    type="password"
                    className="password"
                    placeholder="Password"
                    required
                    value={password}
                    name="password"
                    onChange={registerDataChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="sign_up_Image">
                <img src={avatar} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  required
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <br />
              <input
                type="submit"
                value="Sign Up"
                className="signup-submit-button"
              />
              <div className="account__suggestion">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    transition="glide-left"
                    className="sugg__link"
                  >
                    Log in
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

export default Signup;
