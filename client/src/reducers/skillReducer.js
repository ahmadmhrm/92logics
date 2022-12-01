import {
  // CREATE SKILL
  CREATE_SKILL_REQUEST,
  CREATE_SKILL_SUCCESS,
  CREATE_SKILL_FAIL,
  CREATE_SKILL_RESET,
  // GET SKILL
  GET_SKILL_REQUEST,
  GET_SKILL_SUCCESS,
  GET_SKILL_FAIL,
  // UPDATE SKILL
  UPDATE_SKILL_REQUEST,
  UPDATE_SKILL_SUCCESS,
  UPDATE_SKILL_FAIL,
  UPDATE_SKILL_RESET,
  // DELETE SKILL
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  DELETE_SKILL_RESET,
  // DETAIL SKILL
  DETAIL_SKILL_REQUEST,
  DETAIL_SKILL_SUCCESS,
  DETAIL_SKILL_FAIL,
  // CLEAR ERRORS
  CLEAR_ERRORS,
} from "../constants/skillConstant";

// CREATE NEW SKILL (ADMIN)
export const newSkillReducer = (state = { newSkill: {} }, action) => {
  switch (action.type) {
    case CREATE_SKILL_REQUEST:
      return {
        loading: true,
        newSkill: {},
      };
    case CREATE_SKILL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newSkill: action.payload.newSkill,
      };

    case CREATE_SKILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_SKILL_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// GET SKILL
export const getAllSkillReducer = (state = { skills: [] }, action) => {
  switch (action.type) {
    case GET_SKILL_REQUEST:
      return {
        loading: true,
        skills: [],
      };
    case GET_SKILL_SUCCESS:
      return {
        loading: false,
        skills: action.payload.skills,
      };

    case GET_SKILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// UPDATE SKILL (ADMIN)
export const skillReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SKILL_REQUEST:
    case DELETE_SKILL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SKILL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_SKILL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_SKILL_FAIL:
    case DELETE_SKILL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_SKILL_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_SKILL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// SKILL DETAILS
export const skillDetailsReducer = (state = { skillDetail: {} }, action) => {
  switch (action.type) {
    case DETAIL_SKILL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DETAIL_SKILL_SUCCESS:
      return {
        loading: false,
        skillDetail: action.payload,
      };
    case DETAIL_SKILL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
