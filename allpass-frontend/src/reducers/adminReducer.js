import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    RESET_PASS_REQUEST,
    RESET_PASS_FAILURE,
    RESET_PASS_SUCCESS,
    CREATE_API_KEY_REQUEST,
    CREATE_API_KEY_FAILURE,
    CREATE_API_KEY_SUCCESS,
    UPDATE_USERS_FILTER
  } from '../constants/adminConstants';
  
  const initialState = {};
  
  const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_USERS_FILTER:
          let tempUsers = [];
          tempUsers = state.users.filter(panel => panel.email.includes(action.filter));
          return {
            ...state,
            filteredUsers: tempUsers
          }
      case CREATE_USER_REQUEST:
        return {
          ...state
        };
      case CREATE_USER_SUCCESS:
        return {
          ...state
        };
      case CREATE_USER_FAILURE:
        return {
          ...state,
          message: action.message
        };
      case GET_USERS_REQUEST:
        return {
          ...state
        };
      case GET_USERS_SUCCESS:
        return {
          ...state,
          filteredUsers: action.users,
          users: action.users
        };
      case GET_USERS_FAILURE:
        return {
          ...state
        };
      case DELETE_USER_REQUEST:
        return {
          ...state
        };
      case DELETE_USER_SUCCESS:
        return {
          ...state
        };
      case DELETE_USER_FAILURE:
        return {
          ...state
        };
      case EDIT_USER_REQUEST:
        return {
          ...state
        };
      case EDIT_USER_SUCCESS:
        return {
          ...state
        };
      case EDIT_USER_FAILURE:
        return {
          ...state
        };
      case RESET_PASS_REQUEST:
        return {
          ...state
        };
      case RESET_PASS_SUCCESS:
        return {
          ...state
        };
      case RESET_PASS_FAILURE:
        return {
          ...state
        };
      case CREATE_API_KEY_REQUEST:
        return {
          ...state
        };
      case CREATE_API_KEY_SUCCESS:
        return {
          apiKey: action.apiKey,
          ...state
        };
      case CREATE_API_KEY_FAILURE:
        return {
          ...state
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;