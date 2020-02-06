import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAILURE,
  EDIT_USER_FAILURE,
  CREATE_API_KEY_REQUEST,
  CREATE_API_KEY_SUCCESS,
  CREATE_API_KEY_FAILURE,
  UPDATE_USERS_FILTER
} from '../constants/adminConstants';
import config from '../../src/config';

const createUserRequest = () => ({
  type: CREATE_USER_REQUEST
});

const createUserSuccess = () => ({
  type: CREATE_USER_SUCCESS
});

const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  error: error
});

const getUsersRequest = () => ({
  type: GET_USERS_REQUEST
});

const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  users: users
});

const getUsersFailure = error => ({
  type: GET_USERS_FAILURE,
  error: error
});

const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST
});

const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS
});

const deleteUserFailure = error => ({
  type: DELETE_USER_FAILURE,
  error: error
});

const editUserRequest = () => ({
  type: EDIT_USER_REQUEST
});

const editUserSuccess = () => ({
  type: EDIT_USER_SUCCESS
});

const editUserFailure = error => ({
  type: EDIT_USER_FAILURE,
  error: error
});

const resetPassRequest = () => ({
  type: RESET_PASS_REQUEST
});

const resetPassFailure = error => ({
  type: RESET_PASS_SUCCESS,
  error: error
});

const resetPassSuccess = () => ({
  type: RESET_PASS_FAILURE
});

const createApiKeyRequest = () => ({
  type: CREATE_API_KEY_REQUEST
});

const createApiKeySuccess = response => ({
  apiKey: response,
  type: CREATE_API_KEY_SUCCESS
});

const createApiKeyFailure = () => ({
  type: CREATE_API_KEY_FAILURE
});

export const usersFilter = filter => ({
  type: UPDATE_USERS_FILTER,
  filter: filter
});

export const createUser = (fname, lname, email, username, pass1, pass2) => {
  return dispatch => {
    dispatch(createUserRequest());
    fetch(config.api.networkInterface + '/api/admin/createUser', {
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
          return response.text();
        } else {
          return;
        }
      })
      .then(response => {
        if (typeof response !== 'string') {
          dispatch(getUsers());
          dispatch(createUserSuccess());
        } else {
          dispatch(createUserFailure(response));
        }
      })
      .catch(error => {
        dispatch(createUserFailure(error.message));
      });
  };
};

export const getUsers = () => {
  return dispatch => {
    dispatch(getUsersRequest());
    fetch(config.api.networkInterface + '/api/admin/getUsers', {
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
        dispatch(getUsersSuccess(response));
      })
      .catch(error => {
        dispatch(getUsersFailure(error));
      });
  };
};

export const deleteUser = id => {
  return dispatch => {
    dispatch(deleteUserRequest());
    fetch(config.api.networkInterface + '/api/admin/deleteUser', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        id
      })
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.status);
        } else {
          return;
        }
      })
      .then(response => {
        dispatch(deleteUserSuccess());
        dispatch(getUsers());
      })
      .catch(error => {
        dispatch(deleteUserFailure(error));
      });
  };
};
export const resetPass = id => {
  return dispatch => {
    dispatch(resetPassRequest());
    let url = new URL(config.api.networkInterface + '/api/admin/resetPass'),
      params = {
        id: id
      };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    fetch(url, {
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
        dispatch(resetPassSuccess(response));
      })
      .catch(error => {
        dispatch(resetPassFailure(error));
      });
  };
};
export const editUser = (
  id,
  role,
  fname,
  lname,
  email,
  phone,
  carrier_value,
  organization
) => {
  return dispatch => {
    dispatch(editUserRequest());
    fetch(config.api.networkInterface + '/api/admin/editUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        id,
        role,
        fname,
        lname,
        email,
        phone,
        carrier_value,
        organization
      })
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then(response => {
        dispatch(editUserSuccess(response));
        dispatch(getUsers());
      })
      .catch(error => {
        dispatch(editUserFailure(error));
      });
  };
};

export const generateApiKey = () => {
  return dispatch => {
    dispatch(createApiKeyRequest());
    fetch(config.api.networkInterface + '/api/admin/generateApiKey', {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        if (response.status !== 200) {
          dispatch(createApiKeyFailure());
        } else {
          response
            .text()
            .then(response => dispatch(createApiKeySuccess(response)));
        }
      })
      .catch(error => {
        dispatch(createApiKeyFailure(error.message));
      });
  };
};
