import {
  // CREATE FEATURE
  CREATE_FEATURE_REQUEST,
  CREATE_FEATURE_SUCCESS,
  CREATE_FEATURE_FAIL,
  CREATE_FEATURE_RESET,
  // GET FEATURE
  GET_FEATURE_REQUEST,
  GET_FEATURE_SUCCESS,
  GET_FEATURE_FAIL,
  // UPDATE FEATURE
  UPDATE_FEATURE_REQUEST,
  UPDATE_FEATURE_SUCCESS,
  UPDATE_FEATURE_FAIL,
  UPDATE_FEATURE_RESET,
  // DELETE FEATURE
  DELETE_FEATURE_REQUEST,
  DELETE_FEATURE_SUCCESS,
  DELETE_FEATURE_FAIL,
  DELETE_FEATURE_RESET,
  // DETAIL FEATURE
  DETAIL_FEATURE_REQUEST,
  DETAIL_FEATURE_SUCCESS,
  DETAIL_FEATURE_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/featureConstant";

// CREATE NEW FEATURE (ADMIN)
export const newFeatureReducer = (state = { newFeature: {} }, action) => {
  switch (action.type) {
    case CREATE_FEATURE_REQUEST:
      return {
        loading: true,
        newFeature: {},
      };
    case CREATE_FEATURE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newFeature: action.payload.newFeature,
      };

    case CREATE_FEATURE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_FEATURE_RESET:
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
export const getAllFeatureReducer = (state = { features: [] }, action) => {
  switch (action.type) {
    case GET_FEATURE_REQUEST:
      return {
        loading: true,
        features: [],
      };
    case GET_FEATURE_SUCCESS:
      return {
        loading: false,
        features: action.payload.features,
      };

    case GET_FEATURE_FAIL:
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
export const featureReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_FEATURE_REQUEST:
    case DELETE_FEATURE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FEATURE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_FEATURE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_FEATURE_FAIL:
    case DELETE_FEATURE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_FEATURE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_FEATURE_RESET:
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
export const featureDetailsReducer = (
  state = { featureDetail: {} },
  action
) => {
  switch (action.type) {
    case DETAIL_FEATURE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_FEATURE_SUCCESS:
      return {
        loading: false,
        featureDetail: action.payload,
      };
    case DETAIL_FEATURE_FAIL:
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
