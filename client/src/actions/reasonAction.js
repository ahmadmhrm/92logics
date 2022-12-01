import axios from "axios";
import {
  // CREATE REASON
  CREATE_REASON_REQUEST,
  CREATE_REASON_SUCCESS,
  CREATE_REASON_FAIL,
  // GET REASON
  GET_REASON_REQUEST,
  GET_REASON_SUCCESS,
  GET_REASON_FAIL,
  // UPDATE REASON
  UPDATE_REASON_REQUEST,
  UPDATE_REASON_SUCCESS,
  UPDATE_REASON_FAIL,
  // DELETE REASON
  DELETE_REASON_REQUEST,
  DELETE_REASON_SUCCESS,
  DELETE_REASON_FAIL,
  // DETAIL REASON
  DETAIL_REASON_REQUEST,
  DETAIL_REASON_SUCCESS,
  DETAIL_REASON_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/reasonConstant";

// CREATE REASON
export const reasonContent = (reasonData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REASON_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/reason",
      reasonData,
      config
    );

    dispatch({ type: CREATE_REASON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_REASON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL REASON
export const getAllReason = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REASON_REQUEST });

    const { data } = await axios.get("/api/v1/reasons");

    dispatch({ type: GET_REASON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_REASON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE REASON (ADMIN)
export const updateReason = (id, reasonData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REASON_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/reason/${id}`,
      reasonData,
      config
    );

    dispatch({
      type: UPDATE_REASON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_REASON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE PROJECT (ADMIN)
export const deleteReason = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REASON_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/reason/${id}`);

    dispatch({ type: DELETE_REASON_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_REASON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get REASON Details
export const getReasonDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_REASON_REQUEST });

    const { data } = await axios.get(`/api/v1/reason/${id}`);

    dispatch({
      type: DETAIL_REASON_SUCCESS,
      payload: data.reasonDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_REASON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
