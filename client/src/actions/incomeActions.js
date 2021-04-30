// Import action types
import {
  GET_INCOMES,
  ADD_INCOME,
  SELECT_INCOME,
  EDIT_INCOME,
  DELETE_INCOME,
  LOADING_INCOMES,
  UPDATE_INCOME_COL,
  SORT_INCOME,
  AUTH_ERROR
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import token config to authorize updates and returnErrors to register errors
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
// Import the server route
import server from './route';

// Return all of the user's incomes
export const getIncomes = () => (dispatch, getState) => {
  dispatch(setIncomesLoading());
  // Get the user id
  const user = getState().auth.user;
  if (user) {
    const user_id = user.id || user._id;
    // Create an authorization token and get the incomes
    axios.get(`${server}/api/incomes/${user_id}`, tokenConfig(getState))
    .then(res => dispatch({ type: GET_INCOMES, payload: res.data }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
  }
  else return { type: AUTH_ERROR };
}

// Create a new income from the user entries
export const addIncome = income => (dispatch, getState) => {
  // Get the user id
  const user = getState().auth.user;
  if (user) {
    // Convert the new income to JSON and add in the user's id
    const newIncome = JSON.stringify({...income, user_id: user.id});
    // Submit a post with the new income and the json web token
    axios.post(`${server}/api/incomes`, newIncome, tokenConfig(getState))
    .then(res => dispatch({ type: ADD_INCOME, payload: res.data }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
  }
  else return { type: AUTH_ERROR };
}

// Edit the selected income with new entries
export const editIncome = income => (dispatch, getState) => {
  // Convert the edited income to JSON
  const edits = JSON.stringify({ ...income });
  // Submit a post with the edited income and the json web token
  axios.post(`${server}/api/incomes/${income._id}`, edits, tokenConfig(getState))
  .then(res => dispatch({ type: EDIT_INCOME, payload: res.data }))
  .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// Remove the selected income
export const deleteIncome = id => (dispatch, getState) => {
  axios.delete(`${server}/api/incomes/${id}`, tokenConfig(getState))
  .then(res => dispatch({ type: DELETE_INCOME, payload: id }))
}

// Show or hide a column when the selector is clicked
export const updateIncomeCol = clicked => dispatch => {
  dispatch({ type: UPDATE_INCOME_COL, payload: clicked });
}

// Store the selected income id to locate it later
export const selectIncome = (income, index) => dispatch => {
  dispatch({ type: SELECT_INCOME, payload: {income, index} });
}

// Change the selected index when the table is sorted
// TODO: instead of deselecting it, move it to the current position of the selected one
export const sortedIncomes = () => { return { type: SORT_INCOME } }

// Set the incomes to loading for spinner animations & etc.
export const setIncomesLoading = () => { return { type: LOADING_INCOMES } }
