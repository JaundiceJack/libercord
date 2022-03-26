import {
  USER_ERROR_RESET, USER_LOGIN_FAILURE
} from './types.js';

export const handleError = err => {
  return err.response &&
    err.response.data.message ?
    err.response.data.message : err.message;
};

// Dispatch errors to the given action type, and to the user if it was bad auth
export const raiseError = (err, type) => dispatch => {
  const theError = handleError(err);
  dispatch({ type: type, payload: theError });
  (theError === "Session has expired." || theError === "Authorization failed.") &&
    dispatch({ type: USER_LOGIN_FAILURE, payload: theError });
}

export const clearError = type => dispatch => {
  switch (type) {
    case 'user':
      dispatch({ type: USER_ERROR_RESET });
      break;
    case 'all':
      dispatch({ type: USER_ERROR_RESET });
      break;
    default:
      dispatch({ type: type });
  }
};
