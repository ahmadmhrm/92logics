import axios from "axios";
import {
  // CREATE BANNER
  CREATE_BANNER_REQUEST,
  CREATE_BANNER_SUCCESS,
  CREATE_BANNER_FAIL,
  // GET BANNER
  GET_BANNER_REQUEST,
  GET_BANNER_SUCCESS,
  GET_BANNER_FAIL,
  // UPDATE BANNER
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  // DELETE BANNER
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  DELETE_BANNER_FAIL,
  // DETAIL BANNER
  DETAIL_BANNER_REQUEST,
  DETAIL_BANNER_SUCCESS,
  DETAIL_BANNER_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/bannerConstant";

// CREATE banner
export const bannerContent = (bannerData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BANNER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/banner",
      bannerData,
      config
    );

    dispatch({ type: CREATE_BANNER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL banner
export const getAllBanners = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BANNER_REQUEST });

    const { data } = await axios.get("/api/v1/banners");

    dispatch({ type: GET_BANNER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE banner (ADMIN)
export const updateBanner = (id, bannerData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BANNER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/banner/${id}`,
      bannerData,
      config
    );

    dispatch({
      type: UPDATE_BANNER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE banner (ADMIN)
export const deleteBanner = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BANNER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/banner/${id}`);

    dispatch({ type: DELETE_BANNER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get web Details
export const getBannerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_BANNER_REQUEST });

    const { data } = await axios.get(`/api/v1/banner/${id}`);

    dispatch({
      type: DETAIL_BANNER_SUCCESS,
      payload: data.bannerDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
