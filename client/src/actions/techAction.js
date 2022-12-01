import axios from "axios";
import {
  // CREATE TECH CONTENT
  CREATE_TECH_CONTENT_REQUEST,
  CREATE_TECH_CONTENT_SUCCESS,
  CREATE_TECH_CONTENT_FAIL,
  // GET TECH CONTENT
  GET_TECH_CONTENT_REQUEST,
  GET_TECH_CONTENT_SUCCESS,
  GET_TECH_CONTENT_FAIL,
  // UPDATE TECH CONTENT
  UPDATE_TECH_CONTENT_REQUEST,
  UPDATE_TECH_CONTENT_SUCCESS,
  UPDATE_TECH_CONTENT_FAIL,
  // DELETE TECH CONTENT
  DELETE_TECH_CONTENT_REQUEST,
  DELETE_TECH_CONTENT_SUCCESS,
  DELETE_TECH_CONTENT_FAIL,
  // TECH CONTENT DETAIL
  DETAIL_TECH_CONTENT_REQUEST,
  DETAIL_TECH_CONTENT_SUCCESS,
  DETAIL_TECH_CONTENT_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/techConstant";

export const createTechContent = (techData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TECH_CONTENT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/techContent",
      techData,
      config
    );

    dispatch({ type: CREATE_TECH_CONTENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_TECH_CONTENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL MESSAGE
export const getTechContent = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TECH_CONTENT_REQUEST });

    const { data } = await axios.get("/api/v1/techContent");

    dispatch({ type: GET_TECH_CONTENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TECH_CONTENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE PROJECT (ADMIN)
export const updateTechContent = (id, techData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TECH_CONTENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/techContent/${id}`,
      techData,
      config
    );

    dispatch({
      type: UPDATE_TECH_CONTENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TECH_CONTENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE PROJECT (ADMIN)
export const deleteTechContent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TECH_CONTENT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/techContent/${id}`);

    dispatch({
      type: DELETE_TECH_CONTENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TECH_CONTENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Project Details
export const getTechContentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_TECH_CONTENT_REQUEST });

    const { data } = await axios.get(`/api/v1/techContent/${id}`);

    dispatch({
      type: DETAIL_TECH_CONTENT_SUCCESS,
      payload: data.contentDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_TECH_CONTENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
