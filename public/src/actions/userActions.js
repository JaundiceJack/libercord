// Import action types
import {
  USER_GET_REQUEST,      USER_GET_SUCCESS,      USER_GET_FAILURE,
  USER_LOGIN_REQUEST,    USER_LOGIN_SUCCESS,    USER_LOGIN_FAILURE,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
  USER_EDIT_REQUEST,     USER_EDIT_SUCCESS,     USER_EDIT_FAILURE,
  USER_DETAILS_RESET,    USER_ERROR_RESET,
  BALANCE_TOGGLE_EDITING,
  ASSET_RESET, LIABILITY_RESET, INCOME_RESET, EXPENSE_RESET,
  CATEGORY_RESET, SOURCE_RESET, LOCATION_RESET
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report authorization errors
import { handleError } from './errorActions';

// Create a config variable to send with routes requiring authorization
const tokenConfig = getState => {
  const { user: { user } } = getState();
  return { headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`
  }};
}

// Make a basic request header for json data
const basicConfig = { headers: { "Content-type": "application/json" } };

// Check the token and load the user
export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/users/profile`, tokenConfig(getState));
    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: USER_GET_FAILURE, payload: handleError(e) }); }
}

// Change the current user's information
export const editUser = user => async (dispatch, getState) => {
  dispatch({ type: USER_EDIT_REQUEST });
  try {
    const { data } = await axios.put(`/api/users/profile`, user, tokenConfig(getState));
    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
  }
  catch (e) { dispatch({ type: USER_EDIT_FAILURE, payload: handleError(e) }) };
}

// Attempt to create a new user with the given username, & password
export const register = user => async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`/api/users`, user, basicConfig);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem('user', JSON.stringify(data));
  } catch (e) { dispatch({ type: USER_REGISTER_FAILURE, payload: handleError(e) }); }
}

// Attempt to log in with the given username and password
export const login = user => async dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`/api/users/login`, user, basicConfig);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('user', JSON.stringify(data));
  } catch (e) { dispatch({ type: USER_LOGIN_FAILURE, payload: handleError(e) }); }
}

// Issue the logout action
export const logout = () => dispatch => {
  localStorage.removeItem('user');
  dispatch({ type: ASSET_RESET });
  dispatch({ type: LIABILITY_RESET });
  dispatch({ type: INCOME_RESET });
  dispatch({ type: EXPENSE_RESET });
  dispatch({ type: CATEGORY_RESET });
  dispatch({ type: SOURCE_RESET });
  dispatch({ type: LOCATION_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LOGOUT_SUCCESS });
}

export const toggleEditingBalance = () => dispatch => { dispatch({ type: BALANCE_TOGGLE_EDITING }) };

// Clear server/user error notifications
export const clearUserError = () => dispatch => {
  dispatch({ type: USER_ERROR_RESET })}
