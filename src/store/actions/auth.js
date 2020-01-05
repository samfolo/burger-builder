import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  }
}

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILED,
    error: error,
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios.get()
    .then(response => {
      dispatch(authSuccess());
    })
    .catch(error => {
      dispatch(authFailed(error));
    })
  }
}