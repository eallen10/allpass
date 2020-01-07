import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE } from "../constants/dataConstants";

    const initialState = {};
    
    const dataReducer = (state = initialState, action) => {
      switch (action.type) {
        case GET_DATA_REQUEST:
        case GET_DATA_SUCCESS:
          return {
            ...state,
            data: action.data
          };
        case GET_DATA_FAILURE:
        default:
          return {
            ...state
          };
      }
    };
    
    export default dataReducer;