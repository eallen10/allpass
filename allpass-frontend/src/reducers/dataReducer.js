import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE, 
  DELETE_DATA_FAILURE, DELETE_DATA_SUCCESS, 
  DELETE_DATA_REQUEST, 
  ADD_DATA_FAILURE, ADD_DATA_SUCCESS, ADD_DATA_REQUEST, DECRYPT_PASSWORDS, UPDATE_RECORDS_FILTER} from "../constants/dataConstants";


    const initialState = {
      mkey: null,
    };
    
    const dataReducer = (state = initialState, action) => {
      switch (action.type) {
        case UPDATE_RECORDS_FILTER:
          let tempRecords = [];
          tempRecords = state.data.filter(panel => panel.account.includes(action.filter));
          return {
            ...state,
            filteredRecords: tempRecords
          }
        case GET_DATA_REQUEST:
          return {
            ...state
          };
        case GET_DATA_SUCCESS:
          return {
            ...state,
            filteredRecords: action.data,
            data: action.data
          };
        case GET_DATA_FAILURE:
          return {
            ...state
          };
        case DELETE_DATA_REQUEST:
          return {
            ...state
          };
        case DELETE_DATA_SUCCESS:
          return {
            ...state
          };
        case DELETE_DATA_FAILURE:
          return {
            ...state
          };
        case ADD_DATA_REQUEST:
          return {
            ...state
          };
        case ADD_DATA_SUCCESS:
          return {
            ...state
          };
        case ADD_DATA_FAILURE:
          return {
            ...state
          };
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