import axios from "axios";
import {
  // CREATE REVIEW
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  // ALL REVIEWS
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  // ALL ADMIN REVIEWS
  ALL_ADMIN_REVIEW_REQUEST,
  ALL_ADMIN_REVIEW_SUCCESS,
  ALL_ADMIN_REVIEW_FAIL,
  // UPDATE REVIEW
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
  // DELETE REVIEW
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  // GET REVIEW DETAILS
  REVIEW_DETAILS_REQUEST,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/reviewConstant";

// CREATE REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/review", reviewData, config);

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews
export const getReviews =
  (currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });

      let link = `/api/v1/reviews?page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// GET ALL ADMIN REVIEWS
export const getAllAdminReviews = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADMIN_REVIEW_REQUEST });

    const { data } = await axios.get("/api/v1/admin/reviews");

    dispatch({ type: ALL_ADMIN_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE REVIEW (ADMIN)
export const deleteReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/review/${id}`);

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE REVIEW (ADMIN)
export const updateReview = (id, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/review/${id}`,
      reviewData,
      config
    );

    dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get REVIEW Details
export const getReviewDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/review/${id}`);

    dispatch({
      type: REVIEW_DETAILS_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};