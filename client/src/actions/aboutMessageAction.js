import axios from "axios";
import {
  ABOUT_MESSAGE_REQUEST,
  ABOUT_MESSAGE_SUCCESS,
  ABOUT_MESSAGE_FAIL,
  // ALL MESSAGE
  ALL_ABOUT_MESSAGE_REQUEST,
  ALL_ABOUT_MESSAGE_SUCCESS,
  ALL_ABOUT_MESSAGE_FAIL,
  // UPDATE ABOUT MESSAGE
  UPDATE_ABOUT_MESSAGE_REQUEST,
  UPDATE_ABOUT_MESSAGE_SUCCESS,
  UPDATE_ABOUT_MESSAGE_FAIL,
  // DELETE ABOUT MESSAGE
  DELETE_ABOUT_MESSAGE_REQUEST,
  DELETE_ABOUT_MESSAGE_SUCCESS,
  DELETE_ABOUT_MESSAGE_FAIL,
  // CONTENT DETAIL
  CONTENT_DETAILS_REQUEST,
  CONTENT_DETAILS_SUCCESS,
  CONTENT_DETAILS_FAIL,
  //  CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/aboutMessageConstant";

export const createAboutMessage = (aboutData) => async (dispatch) => {
  try {
    dispatch({ type: ABOUT_MESSAGE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/aboutMessage",
      aboutData,
      config
    );

    dispatch({ type: ABOUT_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ABOUT_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL MESSAGE
export const getMessage = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ABOUT_MESSAGE_REQUEST });

    const { data } = await axios.get("/api/v1/aboutMessage");

    dispatch({ type: ALL_ABOUT_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_ABOUT_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE PROJECT (ADMIN)
export const updateAboutContent = (id, messageData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ABOUT_MESSAGE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/updateMessage/${id}`,
      messageData,
      config
    );

    dispatch({ type: UPDATE_ABOUT_MESSAGE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ABOUT_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};
// UPDATE PROJECT (ADMIN)
export const deleteAboutContent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ABOUT_MESSAGE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/deleteMessage/${id}`);

    dispatch({ type: DELETE_ABOUT_MESSAGE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ABOUT_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Project Details
export const getContentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/content/${id}`);

    dispatch({
      type: CONTENT_DETAILS_SUCCESS,
      payload: data.content,
    });
  } catch (error) {
    dispatch({
      type: CONTENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
