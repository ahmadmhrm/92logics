import {
  // CREATE MIGRAION
  CREATE_MIGRATION_REQUEST,
  CREATE_MIGRATION_SUCCESS,
  CREATE_MIGRATION_FAIL,
  CREATE_MIGRATION_RESET,
  // GET MIGRAION
  GET_MIGRATION_REQUEST,
  GET_MIGRATION_SUCCESS,
  GET_MIGRATION_FAIL,
  // UPDATE MIGRAION
  UPDATE_MIGRATION_REQUEST,
  UPDATE_MIGRATION_SUCCESS,
  UPDATE_MIGRATION_FAIL,
  UPDATE_MIGRATION_RESET,
  // DELETE MIGRAION
  DELETE_MIGRATION_REQUEST,
  DELETE_MIGRATION_SUCCESS,
  DELETE_MIGRATION_FAIL,
  DELETE_MIGRATION_RESET,
  // DETAIL MIGRAION
  DETAIL_MIGRATION_REQUEST,
  DETAIL_MIGRATION_SUCCESS,
  DETAIL_MIGRATION_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/migrationConstant";

// CREATE NEW MIGRAION (ADMIN)
export const newMigrationReducer = (state = { newMigration: {} }, action) => {
  switch (action.type) {
    case CREATE_MIGRATION_REQUEST:
      return {
        loading: true,
        Migration: {},
      };
    case CREATE_MIGRATION_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        Migration: action.payload.Migration,
      };

    case CREATE_MIGRATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_MIGRATION_RESET:
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

// GET MIGRAION
export const getAllMigrationReducer = (state = { migrations: [] }, action) => {
  switch (action.type) {
    case GET_MIGRATION_REQUEST:
      return {
        loading: true,
        migrations: [],
      };
    case GET_MIGRATION_SUCCESS:
      return {
        loading: false,
        migrations: action.payload.migrations,
      };

    case GET_MIGRATION_FAIL:
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

// UPDATE MIGRAION (ADMIN)
export const migrationReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MIGRATION_REQUEST:
    case DELETE_MIGRATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_MIGRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_MIGRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_MIGRATION_FAIL:
    case DELETE_MIGRATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_MIGRATION_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_MIGRATION_RESET:
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

// MIGRAION DETAILS
export const migrationDetailsReducer = (
  state = { migrationDetail: {} },
  action
) => {
  switch (action.type) {
    case DETAIL_MIGRATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_MIGRATION_SUCCESS:
      return {
        loading: false,
        migrationDetail: action.payload,
      };
    case DETAIL_MIGRATION_FAIL:
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
