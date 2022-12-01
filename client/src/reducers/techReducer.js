import {
  // CREATE TECH CONTENT
  CREATE_TECH_CONTENT_REQUEST,
  CREATE_TECH_CONTENT_SUCCESS,
  CREATE_TECH_CONTENT_FAIL,
  CREATE_TECH_CONTENT_RESET,
  // GET TECH CONTENT
  GET_TECH_CONTENT_REQUEST,
  GET_TECH_CONTENT_SUCCESS,
  GET_TECH_CONTENT_FAIL,
  // UPDATE TECH CONTENT
  UPDATE_TECH_CONTENT_REQUEST,
  UPDATE_TECH_CONTENT_SUCCESS,
  UPDATE_TECH_CONTENT_FAIL,
  UPDATE_TECH_CONTENT_RESET,
  // DELETE TECH CONTENT
  DELETE_TECH_CONTENT_REQUEST,
  DELETE_TECH_CONTENT_SUCCESS,
  DELETE_TECH_CONTENT_FAIL,
  DELETE_TECH_CONTENT_RESET,
  // TECH CONTENT DETAIL
  DETAIL_TECH_CONTENT_REQUEST,
  DETAIL_TECH_CONTENT_SUCCESS,
  DETAIL_TECH_CONTENT_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/techConstant";

// CREATE NEW TECH CONTENT (ADMIN)
export const newTechContentReducer = (
  state = { technologyContent: {} },
  action
) => {
  switch (action.type) {
    case CREATE_TECH_CONTENT_REQUEST:
      return {
        loading: true,
        aboutMessage: {},
      };
    case CREATE_TECH_CONTENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        technologyContent: action.payload.technologyContent,
      };

    case CREATE_TECH_CONTENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_TECH_CONTENT_RESET:
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

// GET TECH CONTENT
export const getAllTechContentReducer = (
  state = { technology: [] },
  action
) => {
  switch (action.type) {
    case GET_TECH_CONTENT_REQUEST:
      return {
        loading: true,
        technology: [],
      };
    case GET_TECH_CONTENT_SUCCESS:
      return {
        loading: false,
        technology: action.payload.technology,
      };

    case GET_TECH_CONTENT_FAIL:
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

// UPDATE TECH CONTENT (ADMIN)
export const techContentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TECH_CONTENT_REQUEST:
    case DELETE_TECH_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TECH_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_TECH_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_TECH_CONTENT_FAIL:
    case DELETE_TECH_CONTENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_TECH_CONTENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_TECH_CONTENT_RESET:
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

// TECH CONTEN DETAIL
export const techContentDetailsReducer = (
  state = { contentDetail: {} },
  action
) => {
  switch (action.type) {
    case DETAIL_TECH_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_TECH_CONTENT_SUCCESS:
      return {
        loading: false,
        contentDetail: action.payload,
      };
    case DETAIL_TECH_CONTENT_FAIL:
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
