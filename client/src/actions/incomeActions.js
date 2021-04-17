// Import action types
import {
  GET_INCOMES,
  ADD_INCOME,
  SELECT_INCOME,
  EDIT_INCOME,
  DELETE_INCOME,
  LOADING_INCOMES,
  UPDATE_INCOME_COL,
  SORT_INCOME
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import token config to authorize updates and returnErrors to register errors
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
// Import the server route
import server from './route';

// Show or hide a column when the selector is clicked
export const updateIncomeCol = clicked => dispatch => {
  return dispatch({ type: UPDATE_INCOME_COL, payload: clicked });
}

// Change the selected index when the table is sorted
// TODO: instead of deselecting it, move it to the current position of the selected one
export const sortedIncomes = () => {
  return { type: SORT_INCOME };
}

// Store the selected income id to locate it later
export const selectIncome = (income, index) => dispatch => {
  return dispatch({ type: SELECT_INCOME, payload: {income, index} });
}

// Edit the selected income with new entries
export const editIncome = income => (dispatch, getState) => {
  // Convert the edited income to JSON
  const edits = JSON.stringify({ ...income });
  // Submit a post with the edited income and the json web token
  axios.post(`${server}/api/incomes/${income._id}`, edits, tokenConfig(getState))
  .catch(err => console.log(err))
  .then(res => dispatch({ type: EDIT_INCOME, payload: res.data }))
  .catch(err => { if (err.response) {
     dispatch(returnErrors(err.response.data, err.response.status)); }})
}

// Return all of the user's incomes
export const getIncomes= () => (dispatch, getState) => {
  dispatch(setIncomesLoading());
  // Get the user id
  const user = getState().auth.user;
  if (user) {
    // Create an authorization token and get the incomes
    axios.get(`${server}/api/incomes/` + user.id, tokenConfig(getState))
    .then(res => dispatch({ type: GET_INCOMES, payload: res.data }))
    .catch(err => {if (err.response) dispatch(returnErrors(err.response.data, err.response.status))});
  }
  else console.log("User not in client memory.");

}

// Create a new income from the user entries
export const addIncome = income => (dispatch, getState) => {
  // Get the user id
  const user = getState().auth.user;
  if (user.id) {
    // Convert the new income to JSON and add in the user's id
    const newIncome = JSON.stringify({...income, user_id: user.id});
    // Submit a post with the new income and the json web token
    axios.post(`${server}/api/incomes`, newIncome, tokenConfig(getState))
    .then(res =>
      // If successful, add the income to the current state
      dispatch({ type: ADD_INCOME, payload: res.data }))
    .catch(err => {
      // If unsuccessful, display the errors
      if (err.response) dispatch(returnErrors(err.response.data, err.response.status));
    })
  }
}

// Remove the selected income
export const deleteIncome = id => (dispatch, getState) => {
  axios.delete(`${server}/api/incomes/${id}`, tokenConfig(getState))
  .then(res =>
    dispatch({ type: DELETE_INCOME, payload: id })
  )
}

// Set the incomes to loading for spinner animations & etc.
export const setIncomesLoading = () => { return { type: LOADING_INCOMES } }
