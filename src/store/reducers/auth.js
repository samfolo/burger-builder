import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility/updateState';

const initialState = {
  token: null,
  userID: null,
  error: null,
  loading: false,
  loggedIn: false,
  email: null,
  authRedirectPath: '/',
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userID: action.userID,
    error: null,
    loading: false,
    loggedIn: true,
    email: action.email,
  });
}

const authFailed = (state, action) => {
  return updateObject(state, { error: action.error, loading: false, });
}

const autoLogOut = (state, action) => {
  return updateObject(state, { token: null, userID: null, loggedIn: false, email: null,})
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START : return authStart(state, action);
    case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
    case actionTypes.AUTH_FAILED : return authFailed(state, action);
    case actionTypes.AUTO_LOG_OUT : return autoLogOut(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state, action);
    default : return state;
  }
}

export default reducer;