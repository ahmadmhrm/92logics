import {
  // CREATE FAQ
  CREATE_FAQ_REQUEST,
  CREATE_FAQ_SUCCESS,
  CREATE_FAQ_FAIL,
  CREATE_FAQ_RESET,
  // GET SKILL
  GET_FAQ_REQUEST,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
  // UPDATE FAQ
  UPDATE_FAQ_REQUEST,
  UPDATE_FAQ_SUCCESS,
  UPDATE_FAQ_FAIL,
  UPDATE_FAQ_RESET,
  // DELETE FAQ
  DELETE_FAQ_REQUEST,
  DELETE_FAQ_SUCCESS,
  DELETE_FAQ_FAIL,
  DELETE_FAQ_RESET,
  // DETAIL FAQ
  DETAIL_FAQ_REQUEST,
  DETAIL_FAQ_SUCCESS,
  DETAIL_FAQ_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/faqConstant";

// CREATE NEW SKILL (ADMIN)
export const newFaqReducer = (state = { newFaq: {} }, action) => {
  switch (action.type) {
    case CREATE_FAQ_REQUEST:
      return {
        loading: true,
        newFaq: {},
      };
    case CREATE_FAQ_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newFaq: action.payload.newFaq,
      };

    case CREATE_FAQ_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_FAQ_RESET:
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

// GET SKILL
export const getAllFaqReducer = (state = { faqs: [] }, action) => {
  switch (action.type) {
    case GET_FAQ_REQUEST:
      return {
        loading: true,
        faqs: [],
      };
    case GET_FAQ_SUCCESS:
      return {
        loading: false,
        faqs: action.payload.faqs,
      };

    case GET_FAQ_FAIL:
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

// UPDATE SKILL (ADMIN)
export const faqReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FAQ_REQUEST:
    case DELETE_FAQ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_FAQ_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_FAQ_FAIL:
    case DELETE_FAQ_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_FAQ_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_FAQ_RESET:
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

// SKILL DETAILS
export const faqDetailsReducer = (state = { faqDetail: {} }, action) => {
  switch (action.type) {
    case DETAIL_FAQ_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_FAQ_SUCCESS:
      return {
        loading: false,
        faqDetail: action.payload,
      };
    case DETAIL_FAQ_FAIL:
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
