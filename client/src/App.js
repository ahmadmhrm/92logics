import React, { useEffect } from "react";
import "./App.css";
import "./css/mediaquery.css";
import { BrowserRouter as Router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "react-tiger-transition/styles/main.min.css";
import {
  Navigation,
  Route,
  scale,
  glideIn,
  glideOut,
  flip,
  glide,
  slide,
} from "react-tiger-transition";

import Home from "./pages/home";
import WebsiteDevelopment from "./pages/website-development";
import MigrationExpert from "./pages/migration-expert";
import DatabaseConsultancy from "./pages/database-consultancy";
import AboutUs from "./pages/aboutUs";
import Services from "./pages/services";
import Contact from "./pages/contact";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Profile from "./pages/profile";
import UpdateProfile from "./pages/updateProfile";
import UpdatePassword from "./pages/updatePassword";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/protectedRoute";
import ProjectsList from "./pages/projectsList";
import NewProject from "./pages/newProject";
import UpdateProject from "./pages/updateProject";
import UsersList from "./pages/usersList";
import UpdateUser from "./pages/updateUser";
import UserReviews from "./pages/userReviews";
import AboutMessage from "./pages/aboutMessage";
import UpdateAboutMessage from "./pages/updateAboutMessage";
import NewTechContent from "./pages/newTechContent";
import UpdateTechContent from "./pages/updateTechContent";
import NewReason from "./pages/newReason";
import UpdateReason from "./pages/updateReason";
import NewFeature from "./pages/newFeature";
import UpdateFeature from "./pages/updateFeature";
import NewSkill from "./pages/newSkill";
import UpdateSkill from "./pages/updateSkill";
import UpdateFaq from "./pages/updateFaq";
import NewFaq from "./pages/newFaq";
import NewWeb from "./pages/newWeb";
import UpdateWeb from "./pages/updateWeb";
import NewMigration from "./pages/newMigration";
import UpdateMigration from "./pages/updateMigration";
import NewDatabase from "./pages/newDatabase";
import UpdateDatabase from "./pages/updateDatabase";
import NewBanner from "./pages/newBanner";
import UpdateBanner from "./pages/updateBanner";
import UpdateReview from "./pages/updateReview";
import store from "./store";
import MessagesList from "./pages/messagesList";

// inject styles
scale({
  name: "scale",
  scale: 1.2,
  exit: {
    delay: 100,
  },
});

glide({
  name: "glide-left",
  direction: "left",
  opacity: 0.3,
});

glide({
  name: "glide-right",
  direction: "right",
  opacity: 0.3,
});

glideIn({
  name: "glideIn-left",
  direction: "left",
});

glideIn({
  name: "glideIn-top",
  direction: "top",
});

glideOut({
  name: "glideOut-bottom",
  direction: "bottom",
});

glideOut({
  name: "glideOut-right",
  direction: "right",
});

flip({
  name: "flip-right",
  direction: "right",
  duration: 200,
});

flip({
  name: "flip-left",
  direction: "left",
  duration: 200,
});

slide({
  name: "slide-left",
  direction: "left",
  duration: 200,
});

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

document.getElementById("root").style.height = "100vh";
document.getElementById("root").style.backgroundColor = "#fff";

const App = () => {
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const hideInsteadOfUnmount = {
    mountOnEnter: true,
    unmountOnExit: true,
    onExited: (node) => node.classList.add(classes.hide),
    onEnter: (node) => node.classList.remove(classes.hide),
  };
  return (
    <>
      <Router>
        <Navigation>
          <Route exact path="/" transitionProps={{ ...hideInsteadOfUnmount }}>
            <Home />
          </Route>

          <Route exact path="/website-design-and-development">
            <WebsiteDevelopment />
          </Route>

          <Route exact path="/migration-expert">
            <MigrationExpert />
          </Route>

          <Route exact path="/database-consultancy">
            <DatabaseConsultancy />
          </Route>

          <Route exact path="/about">
            <AboutUs />
          </Route>

          <Route exact path="/services">
            <Services />
          </Route>

          <Route exact path="/contact">
            <Contact />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <ProtectedRoute exact path="/profile" component={Profile} />

          <Route exact path="/profile/update">
            {isAuthenticated && <UpdateProfile />}
          </Route>

          <Route exact path="/password/update">
            {isAuthenticated && <UpdatePassword />}
          </Route>

          {/* Admin Routes */}
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/projects"
            component={ProjectsList}
          />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/project"
            component={NewProject}
          />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/project/:id"
            component={UpdateProject}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={UsersList}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/user/:id"
            component={UpdateUser}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={UserReviews}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-content"
            component={AboutMessage}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-content/:id"
            component={UpdateAboutMessage}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/tech-content"
            component={NewTechContent}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-tech-content/:id"
            component={UpdateTechContent}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-reason"
            component={NewReason}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-reason/:id"
            component={UpdateReason}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-feature"
            component={NewFeature}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-feature/:id"
            component={UpdateFeature}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-skill"
            component={NewSkill}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-skill/:id"
            component={UpdateSkill}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-faq"
            component={NewFaq}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-faq/:id"
            component={UpdateFaq}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-service"
            component={NewWeb}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-service/:id"
            component={UpdateWeb}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-migration"
            component={NewMigration}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-migration/:id"
            component={UpdateMigration}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-database"
            component={NewDatabase}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-database/:id"
            component={UpdateDatabase}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/new-banner"
            component={NewBanner}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-banner/:id"
            component={UpdateBanner}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/update-review/:id"
            component={UpdateReview}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/inbox"
            component={MessagesList}
          />
        </Navigation>
      </Router>
    </>
  );
};

export default App;
