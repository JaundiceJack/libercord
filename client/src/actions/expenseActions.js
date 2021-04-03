// Import action types
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  LOADING_EXPENSES
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import token config to authorize updates and returnErrors to register errors
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Return all of the user's expenses
export const getExpenses= () => (dispatch, getState) => {
  dispatch(setExpensesLoading());
  // Get the user id
  const user = getState().auth.user;
  if (user) {
    // Create an authorization token and get the expenses
    axios.get('/api/expenses/' + user.id, tokenConfig(getState))
    .then(res => dispatch({ type: GET_EXPENSES, payload: res.data }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
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
    axios.post('/api/expenses', newExpense, tokenConfig(getState))
    .then(res =>
      // If successful, add the expense to the current state
      dispatch({ type: ADD_EXPENSE, payload: res.data }))
    .catch(err =>
      // If unsuccessful, display the errors
      dispatch(returnErrors(err.response.data, err.response.status)));
  }
}

// Remove the selected expense
export const deleteExpense = id => (dispatch, getState) => {
  axios.delete(`/api/expenses/${id}`, tokenConfig(getState))
  .then(res =>
    dispatch({ type: DELETE_EXPENSE, payload: id })
  )
}

// Set the expenses to loading for spinner animations & etc.
export const setExpensesLoading = () => { return { type: LOADING_EXPENSES } }
