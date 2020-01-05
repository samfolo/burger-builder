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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
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

      // using local storage to persist token info
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);

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

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationDate');
    let expirationDate;

    if (storedExpirationDate) {
      expirationDate = new Date(localStorage.getItem('expirationDate'));
    }
    
    if (token && expirationDate > new Date()) {
      axios.post(`/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`, { idToken: token })
      .then(response => {
        console.log('[actions/auth.js] user info: ', response.data);
        const userID = response.data.users[0].localId;
        const email = response.data.users[0].email;

        const payload = {
          idToken: token,
          localID: userID,
          email: email,
        }
        dispatch(authSuccess(payload));
      })
      .catch(error => {

      });
    } else {
      dispatch(autoLogOut());
    }
  }
}