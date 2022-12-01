import {
  // CREATE REVIEW
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  // ALL REVIEWS
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  // ALL ADMIN REVIEWS
  ALL_ADMIN_REVIEW_REQUEST,
  ALL_ADMIN_REVIEW_SUCCESS,
  ALL_ADMIN_REVIEW_FAIL,
  // UPDATE REVIEW
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
  UPDATE_REVIEW_RESET,
  // DELETE REVIEW
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  // GET REVIEW DETAILS
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/reviewConstant";

// CREATE NEW REVIEW (ADMIN)
export const newReviewReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
        review: {},
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        review: action.payload.review,
      };

    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
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

// GET ALL reviews
export const reviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEW_REQUEST:
    case ALL_ADMIN_REVIEW_REQUEST:
      return {
        loading: true,
        reviews: [],
      };
    case ALL_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload.reviews,
        reviewsCount: action.payload.reviewsCount,
        resultPerPage: action.payload.resultPerPage,
      };
    case ALL_ADMIN_REVIEW_SUCCESS:
      return {
        loading: false,
        projects: action.payload,
      };
    case ALL_REVIEW_FAIL:
    case ALL_ADMIN_REVIEW_FAIL:
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

// DELETE AND UPDATE REVIEW (ADMIN)
export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
    case UPDATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_REVIEW_RESET:
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

// REVIEW detail
export const reviewDetailsReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case REVIEW_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_DETAILS_SUCCESS:
      return {
        loading: false,
        review: action.payload,
      };
    case REVIEW_DETAILS_FAIL:
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
