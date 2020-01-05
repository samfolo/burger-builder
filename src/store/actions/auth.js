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
    email: authData.email,
  }
}

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const autoLogOut = () => {
  return {
    type: actionTypes.AUTO_LOG_OUT,
  }
}

const checkAuthTimeOut = expiresIn => {
  return dispatch => {
    setTimeout(() => {
      dispatch(autoLogOut());
    }, expiresIn * 1000)
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
      dispatch(checkAuthTimeOut(response.data.expiresIn))
    })
    .catch(error => {
      console.log(error);
      dispatch(authFailed(error.response.data.error));
    })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}