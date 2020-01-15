import {
    CLOSE_DIALOG,
    OPEN_DIALOG,
    OPEN_DIALOG_WITH_ARGS
  } from '../constants/dialogConstants';
import { ADD_DATA_SUCCESS, DECRYPT_PASSWORDS } from '../constants/dataConstants';
import { CREATE_USER_SUCCESS } from '../constants/adminConstants';
  
  const initialState = {
    dialog: null
  };
  
  const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_DIALOG:
        return {
          dialog: action.dialog
        };
      case OPEN_DIALOG_WITH_ARGS:
        return {
          dialog: action.dialog,
          args: action.args
        };
      case CLOSE_DIALOG:
        return {
          initialState
        }
      case ADD_DATA_SUCCESS:
        return {
          initialState
        }
      case CREATE_USER_SUCCESS:
        return {
          initialState
        }
      case DECRYPT_PASSWORDS:
        return {
          initialState
        }
      default:
        return state;
    }
  };
  
  export default dialogReducer;