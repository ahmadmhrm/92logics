import axios from "axios";
import {
  // CREATE DATABASE
  CREATE_DATABASE_REQUEST,
  CREATE_DATABASE_SUCCESS,
  CREATE_DATABASE_FAIL,
  // GET DATABASE
  GET_DATABASE_REQUEST,
  GET_DATABASE_SUCCESS,
  GET_DATABASE_FAIL,
  // UPDATE DATABASE
  UPDATE_DATABASE_REQUEST,
  UPDATE_DATABASE_SUCCESS,
  UPDATE_DATABASE_FAIL,
  // DELETE DATABASE
  DELETE_DATABASE_REQUEST,
  DELETE_DATABASE_SUCCESS,
  DELETE_DATABASE_FAIL,
  // DETAIL DATABASE
  DETAIL_DATABASE_REQUEST,
  DETAIL_DATABASE_SUCCESS,
  DETAIL_DATABASE_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/databaseConstant";

// CREATE database
export const databaseContent = (databaseData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DATABASE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/database",
      databaseData,
      config
    );

    dispatch({ type: CREATE_DATABASE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_DATABASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL database
export const getAllDatabases = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DATABASE_REQUEST });

    const { data } = await axios.get("/api/v1/databases");

    dispatch({ type: GET_DATABASE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_DATABASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE database (ADMIN)
export const updateDatabase = (id, databaseData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DATABASE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/database/${id}`,
      databaseData,
      config
    );

    dispatch({
      type: UPDATE_DATABASE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DATABASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE database (ADMIN)
export const deleteDatabase = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DATABASE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/database/${id}`);

    dispatch({ type: DELETE_DATABASE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_DATABASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get database Details
export const getDatabaseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_DATABASE_REQUEST });

    const { data } = await axios.get(`/api/v1/database/${id}`);

    dispatch({
      type: DETAIL_DATABASE_SUCCESS,
      payload: data.databaseDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_DATABASE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
