import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE, DELETE_DATA_REQUEST, 
  DELETE_DATA_SUCCESS, DELETE_DATA_FAILURE, ADD_DATA_REQUEST, ADD_DATA_SUCCESS, ADD_DATA_FAILURE, DECRYPT_PASSWORDS} from "../constants/dataConstants";
import config from '../../src/config'

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

  const deleteDataRequest = () => ({
    type: DELETE_DATA_REQUEST
  });
  
  const deleteDataSuccess = () => ({
    type: DELETE_DATA_SUCCESS
  });
  
  const deleteDataFailure = error => ({
    type: DELETE_DATA_FAILURE,
    error: error
  });

  const addDataRequest = () => ({
    type: ADD_DATA_REQUEST
  });
  
  const addDataSuccess = () => ({
    type: ADD_DATA_SUCCESS
  });
  
  const addDataFailure = error => ({
    type: ADD_DATA_FAILURE,
    error: error
  });

  export const decryptPasswords = key => ({
    type: DECRYPT_PASSWORDS,
    key: key
  });

export const getData = () => {
    return dispatch => {
      dispatch(getDataRequest());
        fetch(config.api.networkInterface + '/api/data/getData', {
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

  export const deleteData = id => {
    return dispatch => {
      dispatch(deleteDataRequest());
        fetch(config.api.networkInterface + '/api/data/deleteData/' + id, {
        method: 'DELETE',
        credentials: 'include'
      })
        .then(response => {
          if (response.status !== 200) {
            dispatch(deleteDataFailure(response.status));
          } else {
            dispatch(deleteDataSuccess());
            dispatch(getData());
          }
        })
        .catch(error => {
          dispatch(deleteDataFailure(error));
        });
    };
  };

  export const addData = (
    account, username, pass
  ) => {
    return dispatch => {
      dispatch(addDataRequest());
        fetch(config.api.networkInterface + '/api/data/addData', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          account, username, pass
        })
      })
      .then(response => {
        if (response.status !== 200) {
          dispatch(addDataFailure(response.status));
        } else {
          dispatch(addDataSuccess());
          dispatch(getData());
        }
      })
      .catch(error => {
        dispatch(addDataFailure(error));
      });
    };
  };
  