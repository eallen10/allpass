import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE, 
  DELETE_DATA_FAILURE, DELETE_DATA_SUCCESS, 
  DELETE_DATA_REQUEST, 
  ADD_DATA_FAILURE, ADD_DATA_SUCCESS, ADD_DATA_REQUEST, DECRYPT_PASSWORDS} from "../constants/dataConstants";
import aes256 from 'aes256';


    const initialState = {
      mkey: null
    };
    
    const dataReducer = (state = initialState, action) => {
      switch (action.type) {
        case GET_DATA_REQUEST:
        case GET_DATA_SUCCESS:
          return {
            ...state,
            data: action.data
          };
        case GET_DATA_FAILURE:
        case DELETE_DATA_REQUEST:
        case DELETE_DATA_SUCCESS:
        case DELETE_DATA_FAILURE:
        case ADD_DATA_REQUEST:
        case ADD_DATA_SUCCESS:
        case ADD_DATA_FAILURE:
        case DECRYPT_PASSWORDS:
          return {
            ...state,
            mkey: action.key
          }
          
        default:
          return {
            ...state
          };
      }
    };
    
    export default dataReducer;