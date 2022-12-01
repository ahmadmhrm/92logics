import axios from "axios";
import {
  // GET ALL PROJECTS
  ALL_PROJECT_REQUEST,
  ALL_PROJECT_SUCCESS,
  ALL_PROJECT_FAIL,
  // GET ALL PROJECTS (ADMIN)
  ALL_ADMIN_PROJECT_REQUEST,
  ALL_ADMIN_PROJECT_SUCCESS,
  ALL_ADMIN_PROJECT_FAIL,
  // CREATE NEW PROJECT (ADMIN)
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAIL,
  // DELETE PROJECT
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  // UPDATE PROJECT
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  // GET PROJECT DETAILS
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  // NEW REVIEW
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/projectConstant";

// Get All Projects
export const getProjects =
  (currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PROJECT_REQUEST });

      let link = `/api/v1/projects?page=${currentPage}`;
      if (category) {
        link = `/api/v1/projects?page=${currentPage}&category=${category}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PROJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PROJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// GET ALL ADMIN PROJECTS
export const getAllAdminProjects = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ADMIN_PROJECT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/projects");

    dispatch({ type: ALL_ADMIN_PROJECT_SUCCESS, payload: data.projects });
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CREATE NEW PROJECT
export const createProject = (projectData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PROJECT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/project/new",
      projectData,
      config
    );

    dispatch({ type: NEW_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE PROJECT (ADMIN)
export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST });

    const { data } = await axios.delete(`/api/v1/project/${id}`);

    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE PROJECT (ADMIN)
export const updateProject = (id, projectData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROJECT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/project/${id}`,
      projectData,
      config
    );

    dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Project Details
export const getProjectDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/project/${id}`);

    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: data.project,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
