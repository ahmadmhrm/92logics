import {
  // CREATE WEB
  CREATE_WEB_REQUEST,
  CREATE_WEB_SUCCESS,
  CREATE_WEB_FAIL,
  CREATE_WEB_RESET,
  // GET WEB
  GET_WEB_REQUEST,
  GET_WEB_SUCCESS,
  GET_WEB_FAIL,
  // UPDATE WEB
  UPDATE_WEB_REQUEST,
  UPDATE_WEB_SUCCESS,
  UPDATE_WEB_FAIL,
  UPDATE_WEB_RESET,
  // DELETE WEB
  DELETE_WEB_REQUEST,
  DELETE_WEB_SUCCESS,
  DELETE_WEB_FAIL,
  DELETE_WEB_RESET,
  // DETAIL WEB
  DETAIL_WEB_REQUEST,
  DETAIL_WEB_SUCCESS,
  DETAIL_WEB_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/webConstant";

// CREATE NEW WEB (ADMIN)
export const newWebReducer = (state = { newWeb: {} }, action) => {
  switch (action.type) {
    case CREATE_WEB_REQUEST:
      return {
        loading: true,
        newWeb: {},
      };
    case CREATE_WEB_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newWeb: action.payload.newWeb,
      };

    case CREATE_WEB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_WEB_RESET:
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

// GET WEB
export const getAllWebReducer = (state = { webs: [] }, action) => {
  switch (action.type) {
    case GET_WEB_REQUEST:
      return {
        loading: true,
        webs: [],
      };
    case GET_WEB_SUCCESS:
      return {
        loading: false,
        webs: action.payload.webs,
      };

    case GET_WEB_FAIL:
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

// UPDATE WEB (ADMIN)
export const webReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_WEB_REQUEST:
    case DELETE_WEB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_WEB_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_WEB_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_WEB_FAIL:
    case DELETE_WEB_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_WEB_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_WEB_RESET:
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

// WEB DETAILS
export const webDetailsReducer = (state = { webDetail: {} }, action) => {
  switch (action.type) {
    case DETAIL_WEB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_WEB_SUCCESS:
      return {
        loading: false,
        webDetail: action.payload,
      };
    case DETAIL_WEB_FAIL:
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
