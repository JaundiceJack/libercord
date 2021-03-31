import { USER_LOADED,
USER_LOADING,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_SUCCESS,
REGISTER_SUCCESS,
REGISTER_FAIL } from './types';
import axios from 'axios';
import {returnErrors} from './errorActions';

// Check the token and load the user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  const config = tokenConfig(getState);
  axios.get('/api/auth/user', config)
  .then(res => { dispatch({ type: USER_LOADED, payload: res.data })})
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR }) });
}

//
export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = { headers: {"Content-Type": "application/json"} };
  if (token) config.headers['x-auth-token'] = token;
  return config;
}

export const register = ({ name, email, password }) => dispatch => {
  // Set headers
  const config = { headers: { 'Content-Type': 'application/json' } };
  // Make a body
  const body = JSON.stringify({ name, email, password });
  // Send the registry
  axios.post('/api/users', body, config)
  .then(res => {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  }).catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({ type: REGISTER_FAIL });
  });
}
