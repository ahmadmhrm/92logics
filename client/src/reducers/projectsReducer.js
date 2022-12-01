import {
  // GET ALL PROJECTS
  ALL_PROJECT_REQUEST,
  ALL_PROJECT_SUCCESS,
  ALL_PROJECT_FAIL,
  // GET ALL PROJECTS (ADMIN)
  ALL_ADMIN_PROJECT_REQUEST,
  ALL_ADMIN_PROJECT_SUCCESS,
  ALL_ADMIN_PROJECT_FAIL,
  // CREATE NEW PROJECT (ADMIN)
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAIL,
  NEW_PROJECT_RESET,
  // DELETE PROJECT
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_RESET,
  // UPDATE PROJECT
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_RESET,
  // GET PROJECT DETAILS
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/projectConstant";

// GET ALL PROJECTS
export const projectsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case ALL_PROJECT_REQUEST:
    case ALL_ADMIN_PROJECT_REQUEST:
      return {
        loading: true,
        projects: [],
      };
    case ALL_PROJECT_SUCCESS:
      return {
        loading: false,
        projects: action.payload.projects,
        projectsCount: action.payload.projectsCount,
        resultPerPage: action.payload.resultPerPage,
      };
    case ALL_ADMIN_PROJECT_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case ALL_PROJECT_FAIL:
    case ALL_ADMIN_PROJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// CREATE NEW PROJECT (ADMIN)
export const newProjectReducer = (state = { project: [] }, action) => {
  switch (action.type) {
    case NEW_PROJECT_REQUEST:
      return {
        loading: true,
        projects: [],
      };
    case NEW_PROJECT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        project: action.payload.project,
      };

    case NEW_PROJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_PROJECT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// DELETE AND UPDATE PROJECT (ADMIN)
export const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_PROJECT_FAIL:
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PROJECT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PROJECT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// prject detail
export const projectDetailsReducer = (state = { project: {} }, action) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_DETAILS_SUCCESS:
      return {
        loading: false,
        project: action.payload,
      };
    case PROJECT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
