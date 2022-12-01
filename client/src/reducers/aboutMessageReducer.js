import {
  // CREATE ABOUT MESSAGE
  ABOUT_MESSAGE_REQUEST,
  ABOUT_MESSAGE_SUCCESS,
  ABOUT_MESSAGE_FAIL,
  ABOUT_MESSAGE_RESET,
  // ALL ABOUT MESSAGE
  ALL_ABOUT_MESSAGE_REQUEST,
  ALL_ABOUT_MESSAGE_SUCCESS,
  ALL_ABOUT_MESSAGE_FAIL,
  // UPDATE ABOUT MESSAGE
  UPDATE_ABOUT_MESSAGE_REQUEST,
  UPDATE_ABOUT_MESSAGE_SUCCESS,
  UPDATE_ABOUT_MESSAGE_FAIL,
  UPDATE_ABOUT_MESSAGE_RESET,
  // DELETE ABOUT MESSAGE
  DELETE_ABOUT_MESSAGE_REQUEST,
  DELETE_ABOUT_MESSAGE_SUCCESS,
  DELETE_ABOUT_MESSAGE_FAIL,
  DELETE_ABOUT_MESSAGE_RESET,
  // CONTENT DETAIL
  CONTENT_DETAILS_REQUEST,
  CONTENT_DETAILS_SUCCESS,
  CONTENT_DETAILS_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/aboutMessageConstant";

// CREATE NEW PROJECT (ADMIN)
export const newAboutMessageReducer = (
  state = { aboutMessage: {} },
  action
) => {
  switch (action.type) {
    case ABOUT_MESSAGE_REQUEST:
      return {
        loading: true,
        aboutMessage: {},
      };
    case ABOUT_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        aboutMessage: action.payload.aboutMessage,
      };

    case ABOUT_MESSAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ABOUT_MESSAGE_RESET:
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

// ALL MESSAGE
export const getAboutMessages = (state = { aboutMessages: [] }, action) => {
  switch (action.type) {
    case ALL_ABOUT_MESSAGE_REQUEST:
      return {
        loading: true,
        aboutMessages: [],
      };
    case ALL_ABOUT_MESSAGE_SUCCESS:
      return {
        loading: false,
        aboutMessages: action.payload.aboutMessages,
      };

    case ALL_ABOUT_MESSAGE_FAIL:
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

// UPDATE MESSAGE (ADMIN)
export const aboutMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ABOUT_MESSAGE_REQUEST:
    case DELETE_ABOUT_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ABOUT_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ABOUT_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_ABOUT_MESSAGE_FAIL:
    case DELETE_ABOUT_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_ABOUT_MESSAGE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_ABOUT_MESSAGE_RESET:
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

// content detail
export const contentDetailsReducer = (state = { content: {} }, action) => {
  switch (action.type) {
    case CONTENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTENT_DETAILS_SUCCESS:
      return {
        loading: false,
        content: action.payload,
      };
    case CONTENT_DETAILS_FAIL:
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
