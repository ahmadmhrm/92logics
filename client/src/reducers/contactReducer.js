import {
  NEW_MESSAGE_REQUEST,
  NEW_MESSAGE_SUCCESS,
  NEW_MESSAGE_ERROR,
  NEW_MESSAGE_RESET,
  // GET ALL
  ALL_MESSAGE_REQUEST,
  ALL_MESSAGE_SUCCESS,
  ALL_MESSAGE_ERROR,
  // DELETE
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_ERROR,
  DELETE_MESSAGE_RESET,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/contactConstant";

// NEW MESSAGE
export const createMessageReducer = (state = { newMessage: {} }, action) => {
  switch (action.type) {
    case NEW_MESSAGE_REQUEST:
      return {
        loading: true,
        newMessage: {},
      };
    case NEW_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newMessage: action.payload.newMessage,
      };
    case NEW_MESSAGE_ERROR:
      return {
        loading: false,
        error: action.type,
      };
    case NEW_MESSAGE_RESET:
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

// GET ALL MESSAGES (ADMIN)
export const messagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case ALL_MESSAGE_REQUEST:
      return {
        loading: true,
        messages: [],
      };
    case ALL_MESSAGE_SUCCESS:
      return {
        loading: false,
        messages: action.payload.messages,
      };

    case ALL_MESSAGE_ERROR:
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

// DELETE MESSAGE (ADMIN)
export const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_MESSAGE_RESET:
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
