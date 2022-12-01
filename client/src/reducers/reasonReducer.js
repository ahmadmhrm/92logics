import {
  // CREATE REASON
  CREATE_REASON_REQUEST,
  CREATE_REASON_SUCCESS,
  CREATE_REASON_FAIL,
  CREATE_REASON_RESET,
  // GET REASON
  GET_REASON_REQUEST,
  GET_REASON_SUCCESS,
  GET_REASON_FAIL,
  // UPDATE REASON
  UPDATE_REASON_REQUEST,
  UPDATE_REASON_SUCCESS,
  UPDATE_REASON_FAIL,
  UPDATE_REASON_RESET,
  // DELETE REASON
  DELETE_REASON_REQUEST,
  DELETE_REASON_SUCCESS,
  DELETE_REASON_FAIL,
  DELETE_REASON_RESET,
  // DETAIL REASON
  DETAIL_REASON_REQUEST,
  DETAIL_REASON_SUCCESS,
  DETAIL_REASON_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/reasonConstant";

// CREATE NEW REASON (ADMIN)
export const newReasonReducer = (state = { newReason: {} }, action) => {
  switch (action.type) {
    case CREATE_REASON_REQUEST:
      return {
        loading: true,
        newReason: {},
      };
    case CREATE_REASON_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newReason: action.payload.newReason,
      };

    case CREATE_REASON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_REASON_RESET:
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

// GET REASON
export const getAllReasonReducer = (state = { reasons: [] }, action) => {
  switch (action.type) {
    case GET_REASON_REQUEST:
      return {
        loading: true,
        reasons: [],
      };
    case GET_REASON_SUCCESS:
      return {
        loading: false,
        reasons: action.payload.reasons,
      };

    case GET_REASON_FAIL:
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

// UPDATE REASON (ADMIN)
export const reasonReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REASON_REQUEST:
    case DELETE_REASON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_REASON_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_REASON_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_REASON_FAIL:
    case DELETE_REASON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_REASON_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_REASON_RESET:
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

// REASON DETAILS
export const reasonDetailsReducer = (state = { reasonDetail: {} }, action) => {
  switch (action.type) {
    case DETAIL_REASON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_REASON_SUCCESS:
      return {
        loading: false,
        reasonDetail: action.payload,
      };
    case DETAIL_REASON_FAIL:
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
