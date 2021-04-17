// Import action types
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  SELECT_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  LOADING_EXPENSES,
  UPDATE_EXPENSE_COL,
  SORT_EXPENSE
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import token config to authorize updates and returnErrors to register errors
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
// Import the server route
import server from './route';

// Show or hide a column when the selector is clicked
export const updateExpenseCol = clicked => dispatch => {
  return dispatch({ type: UPDATE_EXPENSE_COL, payload: clicked });
}

// Change the selected index when the table is sorted
// TODO: instead of deselecting it, move it to the current position of the selected one
export const sortedExpenses = () => {
  return { type: SORT_EXPENSE };
}

// Store the selected expense id to locate it later
export const selectExpense = (expense, index) => dispatch => {
  return dispatch({ type: SELECT_EXPENSE, payload: {expense, index} });
}

// Edit the selected expense with new entries
export const editExpense = expense => (dispatch, getState) => {
  // Convert the edited expense to JSON
  const edits = JSON.stringify({ ...expense });
  // Submit a post with the edited expense and the json web token
  axios.post(`${server}/api/expenses/${expense._id}`, edits, tokenConfig(getState))
  .catch(err => console.log(err))
  .then(res => dispatch({ type: EDIT_EXPENSE, payload: res.data }))
  .catch(err => { if (err.response) {
     dispatch(returnErrors(err.response.data, err.response.status)); }})
}

// Return all of the user's expenses
export const getExpenses = () => (dispatch, getState) => {
  dispatch(setExpensesLoading());
  // Get the user id
  const user = getState().auth.user;
  if (user) {
    // Create an authorization token and get the expenses
    axios.get(`${server}/api/expenses/` + user.id, tokenConfig(getState))
    .then(res => dispatch({ type: GET_EXPENSES, payload: res.data }))
    .catch(err => {if (err.response) dispatch(returnErrors(err.response.data, err.response.status))});
  }
  else console.log("User not in client memory.");

}

// Create a new expense from the user entries
export const addExpense = expense => (dispatch, getState) => {
  // Get the user id
  const user = getState().auth.user;
  if (user.id) {
    // Convert the new expense to JSON and add in the user's id
    const newExpense = JSON.stringify({...expense, user_id: user.id});
    // Submit a post with the new expense and the json web token
    axios.post(`${server}/api/expenses`, newExpense, tokenConfig(getState))
    .then(res =>
      // If successful, add the expense to the current state
      dispatch({ type: ADD_EXPENSE, payload: res.data }))
    .catch(err => {
      // If unsuccessful, display the errors
      if (err.response) dispatch(returnErrors(err.response.data, err.response.status));
    })
  }
}

// Remove the selected expense
export const deleteExpense = id => (dispatch, getState) => {
  axios.delete(`${server}/api/expenses/${id}`, tokenConfig(getState))
  .then(res =>
    dispatch({ type: DELETE_EXPENSE, payload: id })
  )
}

// Set the expenses to loading for spinner animations & etc.
export const setExpensesLoading = () => { return { type: LOADING_EXPENSES } }
