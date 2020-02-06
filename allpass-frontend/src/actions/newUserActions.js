import {
  CREATE_NEW_USER_SUCCESS,
  CREATE_NEW_USER_REQUEST,
  CREATE_NEW_USER_FAILURE
} from '../constants/newUserConstants';
import config from '../../src/config';

const createNewUserRequest = () => ({
  type: CREATE_NEW_USER_REQUEST
});

const createNewUserSuccess = () => ({
  type: CREATE_NEW_USER_SUCCESS
});

const createNewUserFailure = error => ({
  type: CREATE_NEW_USER_FAILURE,
  error: error
});

export const createNewUser = (
  fname,
  lname,
  email,
  username,
  pass1,
  pass2,
  apiKey
) => {
  return dispatch => {
    dispatch(createNewUserRequest());
    fetch(config.api.networkInterface + '/api/createNewUser/' + apiKey, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        fname,
        lname,
        email,
        username,
        pass1,
        pass2
      })
    })
      .then(response => {
        if (response.status !== 200) {
          response.text().then(response => {
            dispatch(createNewUserFailure(response));
          });
        } else {
          dispatch(createNewUserSuccess());
        }
      })
      .catch(error => {
        dispatch(createNewUserFailure(error.message));
      });
  };
};
