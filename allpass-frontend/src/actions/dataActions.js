import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE } from "../constants/dataConstants";

const getDataRequest = () => ({
    type: GET_DATA_REQUEST
  });
  
  const getDataSuccess = data => ({
    type: GET_DATA_SUCCESS,
    data: data
  });
  
  const getDataFailure = error => ({
    type: GET_DATA_FAILURE,
    error: error
  });

export const getData = () => {
    return dispatch => {
      dispatch(getDataRequest());
      fetch('http://localhost:8080/api/data/getData', {
        // fetch('https://personalpass.net/api/data/getData', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then(response => {
          dispatch(getDataSuccess(response));
        })
        .catch(error => {
          dispatch(getDataFailure(error));
        });
    };
  };