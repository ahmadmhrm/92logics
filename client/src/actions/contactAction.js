import axios from "axios";
import {
  NEW_MESSAGE_REQUEST,
  NEW_MESSAGE_SUCCESS,
  NEW_MESSAGE_ERROR,
  // GET ALL
  ALL_MESSAGE_REQUEST,
  ALL_MESSAGE_SUCCESS,
  ALL_MESSAGE_ERROR,
  // DELETE
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_ERROR,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/contactConstant";

// create message
export const createMessage = (newMessageData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_MESSAGE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/new-message",
      newMessageData,
      config
    );

    dispatch({ type: NEW_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_MESSAGE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Get All Messages
export const getMessages = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_MESSAGE_REQUEST });

    const { data } = await axios.get("/api/v1/messages");

    dispatch({
      type: ALL_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_MESSAGE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// delete Message (ADMIN)
export const deleteMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MESSAGE_REQUEST });

    const { data } = await axios.delete(`/api/v1/message/${id}`);

    dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_MESSAGE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = async () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
