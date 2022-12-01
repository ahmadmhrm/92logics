import axios from "axios";
import {
  // CREATE WEB
  CREATE_WEB_REQUEST,
  CREATE_WEB_SUCCESS,
  CREATE_WEB_FAIL,
  CREATE_WEB_RESET,
  // GET WEB
  GET_WEB_REQUEST,
  GET_WEB_SUCCESS,
  GET_WEB_FAIL,
  // UPDATE WEB
  UPDATE_WEB_REQUEST,
  UPDATE_WEB_SUCCESS,
  UPDATE_WEB_FAIL,
  UPDATE_WEB_RESET,
  // DELETE WEB
  DELETE_WEB_REQUEST,
  DELETE_WEB_SUCCESS,
  DELETE_WEB_FAIL,
  DELETE_WEB_RESET,
  // DETAIL WEB
  DETAIL_WEB_REQUEST,
  DETAIL_WEB_SUCCESS,
  DETAIL_WEB_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/webConstant";

// CREATE web
export const webContent = (webData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_WEB_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/admin/web", webData, config);

    dispatch({ type: CREATE_WEB_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_WEB_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL web
export const getAllWebs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WEB_REQUEST });

    const { data } = await axios.get("/api/v1/webs");

    dispatch({ type: GET_WEB_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_WEB_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE web (ADMIN)
export const updateWeb = (id, webData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_WEB_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/web/${id}`,
      webData,
      config
    );

    dispatch({
      type: UPDATE_WEB_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_WEB_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE web (ADMIN)
export const deleteWeb = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_WEB_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/web/${id}`);

    dispatch({ type: DELETE_WEB_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_WEB_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get web Details
export const getWebDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_WEB_REQUEST });

    const { data } = await axios.get(`/api/v1/web/${id}`);

    dispatch({
      type: DETAIL_WEB_SUCCESS,
      payload: data.webDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_WEB_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
