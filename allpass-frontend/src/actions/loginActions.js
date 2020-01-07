import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT
  } from '../constants/loginConstants';
  import auth0 from 'jsonwebtoken';
  
  const loginRequest = username => ({
    type: LOGIN_REQUEST,
    username: username
  });
  
  const loginSuccess = jwt => ({
    type: LOGIN_SUCCESS,
    jwt: jwt,
    decodedJWT: auth0.decode(jwt)
  });
  
  const loginFailure = error => {
    return {
      type: LOGIN_FAILURE,
      error: error
    };
  };
  
  export const logout = () => ({
    type: LOGOUT
  });
  
  export const login = (username, password) => {
    return dispatch => {
      dispatch(loginRequest(username));
      // fetch('http://localhost:8080/login', {
        fetch('https://personalpass.net/api/login', {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password)
        },
        credentials: 'include'
      })
        .then(response => {
          if (response.status === 200) {
            response.text().then(jwt => {
              setCookie('jwt', jwt, 1);
              dispatch(loginSuccess(jwt));
            });
          } else if (response.status === 401) {
            response.text().then(error => {
              dispatch(loginFailure(error));
            });
          }
        })
        .catch(error => {
          dispatch(loginFailure(error));
        });
    };
  };
  
  export const assignJWT = jwt => {
    return dispatch => {
      dispatch(loginSuccess(jwt));
    };
  };
  
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }