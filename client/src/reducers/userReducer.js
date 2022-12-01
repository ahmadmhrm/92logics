import {
  // login
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  // register
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  // load user
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  // logout user
  LOG_OUT_SUCCESS,
  LOG_OUT_FAIL,
  // update user profile
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  // update password
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  // ALL USERS
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  // USER DETAIL
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
  // UPDATE USER
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  // DELETE USER
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  // clear errors
  CLEAR_ERRORS,
} from "../constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOG_OUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOG_OUT_FAIL:
      return {
        ...state,
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
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

// ALL USERS
export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case ALL_USER_FAIL:
      return {
        ...state,
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

// USER Detail
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case USER_DETAIL_FAIL:
      return {
        ...state,
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
