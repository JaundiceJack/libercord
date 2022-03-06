import {
  USER_ERROR_RESET,
} from './types.js';

export const handleError = err => {
  return err.response &&
    err.response.data.message ?
    err.response.data.message : err.message;
};

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
