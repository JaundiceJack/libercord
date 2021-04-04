// Import action types
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL } from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report authorization errors
import { returnErrors } from './errorActions';

// Get the backend server
const server = 'https://libercrypt.herokuapp.com';

// Check the token and load the user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  // Get the json web token and authenticate the user
  const config = tokenConfig(getState);
  axios.get(`${server}/api/auth/user`, config)
  .then(res => {
    // If successful, return the user data to the current state
    dispatch({ type: USER_LOADED, payload: res.data })})
  .catch(err => {
    console.log(err);
    // If unsuccessful, put the errors in the current state
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR }) });
}

// Attempt to create a new user with the given name, email, & password
export const register = ({ name, email, password }) => dispatch => {
  // Set headers
  const config = { headers: { 'Content-Type': 'application/json' } };
  // Turn the entries into JSON format for sending to the server
  const body = JSON.stringify({ name, email, password });
  // Send the registry with the body and config
  axios.post(`${server}/api/users`, body, config)
  .then(res => {
    // If successful, return the user data to the current state
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  }).catch(err => {
    // If unsuccessful, put the errors in the current state
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({ type: REGISTER_FAIL });
  });
}

// Attempt to log in with the given email and password
export const login = ({ email, password }) => dispatch => {
  // Set headers
  const config = { headers: { 'Content-Type': 'application/json' } };
  // Turn the entries into JSON format for sending to the server
  const body = JSON.stringify({ email, password });
  // Send the registry with the body and config
  axios.post(`${server}/api/auth`, body, config)
  .then(res => {
    // If successful, return the user data to the current state
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  }).catch(err => {
    // If unsuccessful, put the errors in the current state
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({ type: LOGIN_FAIL });
  });
}

// Issue the logout action type
export const logout = ()  => {
  return { type: LOGOUT_SUCCESS };
}

// Get a config object with the json web token
export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = { headers: {"Content-type": "application/json"} };
  if (token) config.headers["x-auth-token"] = token;
  return config;
}
