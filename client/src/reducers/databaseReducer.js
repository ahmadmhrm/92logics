import {
  // CREATE DATABASE
  CREATE_DATABASE_REQUEST,
  CREATE_DATABASE_SUCCESS,
  CREATE_DATABASE_FAIL,
  CREATE_DATABASE_RESET,
  // GET DATABASE
  GET_DATABASE_REQUEST,
  GET_DATABASE_SUCCESS,
  GET_DATABASE_FAIL,
  // UPDATE DATABASE
  UPDATE_DATABASE_REQUEST,
  UPDATE_DATABASE_SUCCESS,
  UPDATE_DATABASE_FAIL,
  UPDATE_DATABASE_RESET,
  // DELETE DATABASE
  DELETE_DATABASE_REQUEST,
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAIL,
  DELETE_DATABASE_RESET,
  // DETAIL DATABASE
  DETAIL_DATABASE_REQUEST,
  DETAIL_DATABASE_SUCCESS,
  DETAIL_DATABASE_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/databaseConstant";

// CREATE NEW databases (ADMIN)
export const newDatabaseReducer = (state = { newDatabase: {} }, action) => {
  switch (action.type) {
    case CREATE_DATABASE_REQUEST:
      return {
        loading: true,
        newDatabase: {},
      };
    case CREATE_DATABASE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newDatabase: action.payload.newDatabase,
      };

    case CREATE_DATABASE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_DATABASE_RESET:
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

// GET databases
export const getAllDatabaseReducer = (state = { databases: [] }, action) => {
  switch (action.type) {
    case GET_DATABASE_REQUEST:
      return {
        loading: true,
        databases: [],
      };
    case GET_DATABASE_SUCCESS:
      return {
        loading: false,
        databases: action.payload.databases,
      };

    case GET_DATABASE_FAIL:
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

// UPDATE databases (ADMIN)
export const databaseReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DATABASE_REQUEST:
    case DELETE_DATABASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DATABASE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DATABASE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_DATABASE_FAIL:
    case DELETE_DATABASE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_DATABASE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_DATABASE_RESET:
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

// databases DETAILS
export const databaseDetailsReducer = (
  state = { databaseDetail: {} },
  action
) => {
  switch (action.type) {
    case DETAIL_DATABASE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_DATABASE_SUCCESS:
      return {
        loading: false,
        databaseDetail: action.payload,
      };
    case DETAIL_DATABASE_FAIL:
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
