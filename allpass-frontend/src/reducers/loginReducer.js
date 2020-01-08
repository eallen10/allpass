import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from '../constants/loginConstants';

  const initialState = {jwt: null};
  
  const loginReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case LOGIN_REQUEST:
      case LOGIN_SUCCESS:
        return {
          ...state,
          jwt: action.jwt,
          decodedJWT: action.decodedJWT
        };
      case LOGIN_FAILURE:
      case LOGOUT:
        return initialState;
      default:
        return {
          ...state
        };
    }
  };
  
  export default loginReducer;