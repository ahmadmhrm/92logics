import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-tiger-transition";
import { useSelector } from "react-redux";
import MetaData from "../components/MetaData";
import Loader from "../components/loader";
import "../css/profile.css";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";

const Profile = () => {
  const history = useHistory();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt="user image" />
              <Link to="/profile/update" transition="scale">
                Edit Profile
              </Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/services" transition="glide-left">
                  Our Services
                </Link>
                <Link to="/password/update" transition="scale">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
