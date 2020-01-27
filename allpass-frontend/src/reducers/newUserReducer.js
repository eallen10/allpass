import { CREATE_NEW_USER_REQUEST, CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_FAILURE } from "../constants/newUserConstants";

  
      const initialState = {
      };
      
      const newUserReducer = (state = initialState, action) => {
        switch (action.type) {
          case CREATE_NEW_USER_REQUEST:
            return {
              ...state
            };
          case CREATE_NEW_USER_SUCCESS:
            return {
              createSuccess: true,
              ...state
            };
          case CREATE_NEW_USER_FAILURE:
            return {
              createSuccess: false,
              errorMessage: action.error,
              ...state
            };
          default:
            return {
              ...state
            };
        }
      };
      
      export default newUserReducer;