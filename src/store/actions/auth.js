import * as actionTypes from './actionTypes';
import axios from '../../axios-auth';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userID: authData.localId,
  }
}

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const auth = (email, password, isSignUp) => {
  const url = isSignUp ? '/v1/accounts:signUp?key=' : '/v1/accounts:signInWithPassword?key='
  return dispatch => {
    dispatch(authStart());
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    axios.post(`${url}${process.env.REACT_APP_API_KEY}`, payload)
    .then(response => {
      console.log(response)
      dispatch(authSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFailed(error.response.data.error));
    })
  }
}