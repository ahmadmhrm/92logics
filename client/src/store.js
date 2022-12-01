import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProjectReducer,
  projectDetailsReducer,
  projectReducer,
  projectsReducer,
} from "./reducers/projectsReducer";

import {
  allUsersReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";

import {
  aboutMessageReducer,
  contentDetailsReducer,
  getAboutMessages,
  newAboutMessageReducer,
} from "./reducers/aboutMessageReducer";
import {
  getAllTechContentReducer,
  newTechContentReducer,
  techContentDetailsReducer,
  techContentReducer,
} from "./reducers/techReducer";
import {
  getAllReasonReducer,
  newReasonReducer,
  reasonDetailsReducer,
  reasonReducer,
} from "./reducers/reasonReducer";
import {
  featureDetailsReducer,
  featureReducer,
  getAllFeatureReducer,
  newFeatureReducer,
} from "./reducers/featureReducer";
import {
  getAllSkillReducer,
  newSkillReducer,
  skillDetailsReducer,
  skillReducer,
} from "./reducers/skillReducer";
import {
  faqDetailsReducer,
  faqReducer,
  getAllFaqReducer,
  newFaqReducer,
} from "./reducers/faqReducer";
import {
  getAllWebReducer,
  newWebReducer,
  webDetailsReducer,
  webReducer,
} from "./reducers/webReducer";
import {
  getAllMigrationReducer,
  migrationDetailsReducer,
  migrationReducer,
  newMigrationReducer,
} from "./reducers/migrationReducer";
import {
  databaseDetailsReducer,
  databaseReducer,
  getAllDatabaseReducer,
  newDatabaseReducer,
} from "./reducers/databaseReducer";
import {
  bannerDetailsReducer,
  bannerReducer,
  getAllBannersReducer,
  newBannerReducer,
} from "./reducers/bannerReducer";
import {
  newReviewReducer,
  reviewDetailsReducer,
  reviewReducer,
  reviewsReducer,
} from "./reducers/reviewReducer";
import {
  createMessageReducer,
  messageReducer,
  messagesReducer,
} from "./reducers/contactReducer";

const reducer = combineReducers({
  projects: projectsReducer,
  user: userReducer,
  profile: profileReducer,
  newProject: newProjectReducer,
  project: projectReducer,
  projectDetails: projectDetailsReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  newMessage: newAboutMessageReducer,
  message: getAboutMessages,
  uMessage: aboutMessageReducer,
  content: contentDetailsReducer,
  newtechContent: newTechContentReducer,
  getTechContent: getAllTechContentReducer,
  updateTechContent: techContentReducer,
  techContentDetail: techContentDetailsReducer,
  newReason: newReasonReducer,
  allReasons: getAllReasonReducer,
  reason: reasonReducer,
  reasonDetail: reasonDetailsReducer,
  newFeature: newFeatureReducer,
  allFeature: getAllFeatureReducer,
  feature: featureReducer,
  featureDetails: featureDetailsReducer,
  newSkill: newSkillReducer,
  allSkill: getAllSkillReducer,
  skill: skillReducer,
  skillDetails: skillDetailsReducer,
  newFaq: newFaqReducer,
  allFaq: getAllFaqReducer,
  faq: faqReducer,
  faqDetails: faqDetailsReducer,
  newWeb: newWebReducer,
  allWeb: getAllWebReducer,
  web: webReducer,
  webDetails: webDetailsReducer,
  newMigration: newMigrationReducer,
  allMigration: getAllMigrationReducer,
  migration: migrationReducer,
  migrationDetails: migrationDetailsReducer,
  newDatabase: newDatabaseReducer,
  allDatabase: getAllDatabaseReducer,
  database: databaseReducer,
  databaseDetails: databaseDetailsReducer,
  newBanner: newBannerReducer,
  allBanners: getAllBannersReducer,
  banner: bannerReducer,
  bannerDetails: bannerDetailsReducer,
  newReview: newReviewReducer,
  allreviews: reviewsReducer,
  review: reviewReducer,
  reviewDetails: reviewDetailsReducer,
  createMessage: createMessageReducer,
  messages: messagesReducer,
  contact: messageReducer,
});

const intialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
