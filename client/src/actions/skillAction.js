import axios from "axios";
import {
  // CREATE SKILL
  CREATE_SKILL_REQUEST,
  CREATE_SKILL_SUCCESS,
  CREATE_SKILL_FAIL,
  // GET SKILL
  GET_SKILL_REQUEST,
  GET_SKILL_SUCCESS,
  GET_SKILL_FAIL,
  // UPDATE SKILL
  UPDATE_SKILL_REQUEST,
  UPDATE_SKILL_SUCCESS,
  UPDATE_SKILL_FAIL,
  // DELETE SKILL
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  // DETAIL SKILL
  DETAIL_SKILL_REQUEST,
  DETAIL_SKILL_SUCCESS,
  DETAIL_SKILL_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/skillConstant";

// CREATE REASON
export const skillContent = (skillData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SKILL_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/v1/admin/skill", skillData, config);

    dispatch({ type: CREATE_SKILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SKILL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET ALL REASON
export const getAllSkills = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SKILL_REQUEST });

    const { data } = await axios.get("/api/v1/skills");

    dispatch({ type: GET_SKILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SKILL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// UPDATE REASON (ADMIN)
export const updateSkill = (id, skillData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SKILL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/skill/${id}`,
      skillData,
      config
    );

    dispatch({
      type: UPDATE_SKILL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SKILL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// DELETE PROJECT (ADMIN)
export const deleteSkill = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SKILL_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/skill/${id}`);

    dispatch({ type: DELETE_SKILL_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_SKILL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get REASON Details
export const getSkillDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_SKILL_REQUEST });

    const { data } = await axios.get(`/api/v1/skill/${id}`);

    dispatch({
      type: DETAIL_SKILL_SUCCESS,
      payload: data.skillDetail,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_SKILL_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
