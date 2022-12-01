import axios from "axios";
import {
  // CREATE FEATURE
  CREATE_FEATURE_REQUEST,
  CREATE_FEATURE_SUCCESS,
  CREATE_FEATURE_FAIL,
  // GET FEATURE
  GET_FEATURE_REQUEST,
  GET_FEATURE_SUCCESS,
  GET_FEATURE_FAIL,
  // UPDATE FEATURE
  UPDATE_FEATURE_REQUEST,
  UPDATE_FEATURE_SUCCESS,
  UPDATE_FEATURE_FAIL,
  // DELETE FEATURE
  DELETE_FEATURE_REQUEST,
  DELETE_FEATURE_SUCCESS,
  DELETE_FEATURE_FAIL,
  // DETAIL FEATURE
  DETAIL_FEATURE_REQUEST,
  DETAIL_FEATURE_SUCCESS,
  DETAIL_FEATURE_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/featureConstant";

// CREATE REASON
export const featureContent = (featureData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_FEATURE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/feature",
      featureData,
      config
    );

    dispatch({ type: CREATE_FEATURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_FEATURE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL REASON
export const getAllFeatures = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FEATURE_REQUEST });

    const { data } = await axios.get("/api/v1/features");

    dispatch({ type: GET_FEATURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FEATURE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE REASON (ADMIN)
export const updateFeatureContent = (id, featureData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FEATURE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/feature/${id}`,
      featureData,
      config
    );

    dispatch({
      type: UPDATE_FEATURE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FEATURE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE PROJECT (ADMIN)
export const deleteFeature = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FEATURE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/feature/${id}`);

    dispatch({ type: DELETE_FEATURE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_FEATURE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get REASON Details
export const getFeatureDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_FEATURE_REQUEST });

    const { data } = await axios.get(`/api/v1/feature/${id}`);

    dispatch({
      type: DETAIL_FEATURE_SUCCESS,
      payload: data.featureDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_FEATURE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
