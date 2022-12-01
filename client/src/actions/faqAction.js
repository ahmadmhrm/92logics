import axios from "axios";
import {
  // CREATE FAQ
  CREATE_FAQ_REQUEST,
  CREATE_FAQ_SUCCESS,
  CREATE_FAQ_FAIL,
  // GET SKILL
  GET_FAQ_REQUEST,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
  // UPDATE FAQ
  UPDATE_FAQ_REQUEST,
  UPDATE_FAQ_SUCCESS,
  UPDATE_FAQ_FAIL,
  // DELETE FAQ
  DELETE_FAQ_REQUEST,
  DELETE_FAQ_SUCCESS,
  DELETE_FAQ_FAIL,
  // DETAIL FAQ
  DETAIL_FAQ_REQUEST,
  DETAIL_FAQ_SUCCESS,
  DETAIL_FAQ_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/faqConstant";

// CREATE FAQ
export const faqContent = (faqData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_FAQ_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/admin/faq", faqData, config);

    dispatch({ type: CREATE_FAQ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_FAQ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL FAQ
export const getAllFaqs = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FAQ_REQUEST });

    const { data } = await axios.get("/api/v1/faqs");

    dispatch({ type: GET_FAQ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FAQ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE FAQ (ADMIN)
export const updateFaq = (id, faqData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FAQ_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/faq/${id}`,
      faqData,
      config
    );

    dispatch({
      type: UPDATE_FAQ_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAQ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE PROJECT (ADMIN)
export const deleteFaq = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FAQ_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/faq/${id}`);

    dispatch({ type: DELETE_FAQ_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_FAQ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get FAQ Details
export const getFaqDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_FAQ_REQUEST });

    const { data } = await axios.get(`/api/v1/faq/${id}`);

    dispatch({
      type: DETAIL_FAQ_SUCCESS,
      payload: data.faqDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_FAQ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
