import axios from "axios";
import {
  // CREATE MIGRAION
  CREATE_MIGRATION_REQUEST,
  CREATE_MIGRATION_SUCCESS,
  CREATE_MIGRATION_FAIL,
  // GET MIGRAION
  GET_MIGRATION_REQUEST,
  GET_MIGRATION_SUCCESS,
  GET_MIGRATION_FAIL,
  // UPDATE MIGRAION
  UPDATE_MIGRATION_REQUEST,
  UPDATE_MIGRATION_SUCCESS,
  UPDATE_MIGRATION_FAIL,
  // DELETE MIGRAION
  DELETE_MIGRATION_REQUEST,
  DELETE_MIGRATION_SUCCESS,
  DELETE_MIGRATION_FAIL,
  // DETAIL MIGRAION
  DETAIL_MIGRATION_REQUEST,
  DETAIL_MIGRATION_SUCCESS,
  DETAIL_MIGRATION_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/migrationConstant";

// CREATE REASON
export const migrationContent = (migrationData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MIGRATION_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/admin/migration",
      migrationData,
      config
    );

    dispatch({ type: CREATE_MIGRATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_MIGRATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL REASON
export const getAllMigrations = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MIGRATION_REQUEST });

    const { data } = await axios.get("/api/v1/migrations");

    dispatch({ type: GET_MIGRATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MIGRATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE REASON (ADMIN)
export const updateMigration = (id, migrationData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_MIGRATION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/migration/${id}`,
      migrationData,
      config
    );

    dispatch({
      type: UPDATE_MIGRATION_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MIGRATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE PROJECT (ADMIN)
export const deleteMigration = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MIGRATION_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/migration/${id}`);

    dispatch({ type: DELETE_MIGRATION_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_MIGRATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get REASON Details
export const getMigrationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_MIGRATION_REQUEST });

    const { data } = await axios.get(`/api/v1/migration/${id}`);

    dispatch({
      type: DETAIL_MIGRATION_SUCCESS,
      payload: data.migrationDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_MIGRATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
