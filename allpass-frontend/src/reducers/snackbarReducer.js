import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from '../constants/snackbarConstants';
import { DELETE_DATA_SUCCESS, ADD_DATA_SUCCESS, DELETE_DATA_FAILURE } from '../constants/dataConstants';
import { DELETE_USER_SUCCESS, CREATE_USER_SUCCESS, DELETE_USER_FAILURE } from '../constants/adminConstants';

const initialState = {
  open: false,
  message: null
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        ...state,
        open: true,
        message: action.message
      };
    case CLOSE_SNACKBAR:
      return initialState;
    case ADD_DATA_SUCCESS:
      return {
        open: true,
        message: 'Added Account'
      }
    case DELETE_DATA_SUCCESS:
      return {
        open: true,
        message: 'Deleted Account'
      }
    case DELETE_DATA_FAILURE:
      return {
        open: true,
        message: 'Failed to Delete Account'
      }
    case CREATE_USER_SUCCESS:
      return {
        open: true,
        message: 'Created User'
      }
    case DELETE_USER_SUCCESS:
      return {
        open: true,
        message: 'Deleted User'
      }
    case DELETE_USER_FAILURE:
      return {
        open: true,
        message: 'Failed to Delete User'
      }
    default:
      return state;
  }
};

export default snackbarReducer;