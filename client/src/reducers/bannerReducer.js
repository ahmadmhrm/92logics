import {
  // CREATE BANNER
  CREATE_BANNER_REQUEST,
  CREATE_BANNER_SUCCESS,
  CREATE_BANNER_FAIL,
  CREATE_BANNER_RESET,
  // GET BANNER
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BANNER_FAIL,
  // UPDATE BANNER
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_BANNER_RESET,
  // DELETE BANNER
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_RESET,
  // DETAIL BANNER
  DETAIL_BANNER_REQUEST,
  DETAIL_BANNER_SUCCESS,
  DETAIL_BANNER_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/bannerConstant";

// CREATE NEW BANNER (ADMIN)
export const newBannerReducer = (state = { newBanner: {} }, action) => {
  switch (action.type) {
    case CREATE_BANNER_REQUEST:
      return {
        loading: true,
        newBanner: {},
      };
    case CREATE_BANNER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newBanner: action.payload.newBanner,
      };

    case CREATE_BANNER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_BANNER_RESET:
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

// GET BANNER
export const getAllBannersReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case GET_BANNER_REQUEST:
      return {
        loading: true,
        banners: [],
      };
    case GET_BANNER_SUCCESS:
      return {
        loading: false,
        banners: action.payload.banners,
      };

    case GET_BANNER_FAIL:
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

// UPDATE BANNER (ADMIN)
export const bannerReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_BANNER_REQUEST:
    case DELETE_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_BANNER_FAIL:
    case DELETE_BANNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_BANNER_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_BANNER_RESET:
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

// BANNER DETAILS
export const bannerDetailsReducer = (state = { bannerDetail: {} }, action) => {
  switch (action.type) {
    case DETAIL_BANNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_BANNER_SUCCESS:
      return {
        loading: false,
        bannerDetail: action.payload,
      };
    case DETAIL_BANNER_FAIL:
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
