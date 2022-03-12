// Import action types
import {
  EXPENSE_LIST_REQUEST,   EXPENSE_LIST_SUCCESS,   EXPENSE_LIST_FAILURE,
  EXPENSE_GET_REQUEST,    EXPENSE_GET_SUCCESS,    EXPENSE_GET_FAILURE,
  EXPENSE_CREATE_REQUEST, EXPENSE_CREATE_SUCCESS, EXPENSE_CREATE_FAILURE,
  EXPENSE_EDIT_REQUEST,   EXPENSE_EDIT_SUCCESS,   EXPENSE_EDIT_FAILURE,
  EXPENSE_DELETE_REQUEST, EXPENSE_DELETE_SUCCESS, EXPENSE_DELETE_FAILURE,
  EXPENSE_ERROR_RESET,    EXPENSE_DIRECT_SELECT,
  EXPENSE_TOGGLE_ADDING,  EXPENSE_TOGGLE_EDITING, EXPENSE_TOGGLE_DELETING,
  EXPENSE_TABLE_SORT
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report authorization errors
import { handleError } from './errorActions';
import { inlineCreateCategory } from './categoryActions.js';
import { inlineCreateLocation } from './locationActions.js';

// Create a config variable to send with routes requiring authorization
const tokenConfig = getState => {
  const { user: { user } } = getState();
  return { headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`
  }};
}

// Make a basic request header for json data
//const basicConfig = { headers: { "Content-type": "application/json" } };

// Return all of the user's expenses
export const getExpenses = () => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/expenses/', tokenConfig(getState));
    dispatch({ type: EXPENSE_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: EXPENSE_LIST_FAILURE, payload: handleError(e) }) }
}

// Return an expense with the given id
export const getExpense = id => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/expenses/${id}`, tokenConfig(getState));
    dispatch({ type: EXPENSE_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: EXPENSE_GET_FAILURE, payload: handleError(e) }) }
}

// Create a new expense from the user entries
export const addExpense = expense => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_CREATE_REQUEST });
  try {
    // Create an expense submission with locaiton and category ids included
    const submission = {
      ...expense,
      location: expense.newLocation ?
        await inlineCreateLocation({ name: expense.newLocation }, dispatch, getState) :
        expense.location,
      category: expense.newCategory ?
        await inlineCreateCategory({ name: expense.newCategory, type: 'expense' }, dispatch, getState) :
        expense.category
    }

    const { data } = await axios.post('/api/expenses/', submission, tokenConfig(getState));
    dispatch({ type: EXPENSE_CREATE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: EXPENSE_CREATE_FAILURE, payload: handleError(e) }) }
}

// Edit the expense with the given id
export const editExpense = (id, expense) => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_EDIT_REQUEST });
  try {
    // Create an expense submission with locaiton and category ids included
    const submission = {
      ...expense,
      location: expense.newLocation ?
        await inlineCreateLocation({ name: expense.newLocation }, dispatch, getState) :
        expense.location,
      category: expense.newCategory ?
        await inlineCreateCategory({ name: expense.newCategory, type: 'expense' }, dispatch, getState) :
        expense.category
    }

    const { data } = await axios.put(`/api/expenses/${id}`, submission, tokenConfig(getState));
    dispatch({ type: EXPENSE_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: EXPENSE_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected expense
export const deleteExpense = id => async (dispatch, getState) => {
  dispatch({ type: EXPENSE_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/expenses/${id}`, tokenConfig(getState));
    dispatch({ type: EXPENSE_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: EXPENSE_DELETE_FAILURE, payload: handleError(e) }) }
}

// Clear server/user error notifications
export const clearExpenseError = () => dispatch => {
  dispatch({ type: EXPENSE_ERROR_RESET });
}

// Toggle form states
export const toggleAdding = () => dispatch => { dispatch({ type: EXPENSE_TOGGLE_ADDING }) };
export const toggleEditing = () => dispatch => { dispatch({ type: EXPENSE_TOGGLE_EDITING }) };
export const toggleDeleting = () => dispatch => { dispatch({ type: EXPENSE_TOGGLE_DELETING }) };

// Set the given expense as the selected
export const selectExpense = expense => dispatch => {
  dispatch({ type: EXPENSE_DIRECT_SELECT, payload: expense })}

// Sort the expense table by ascending or descending
export const sortTable = () => dispatch => { dispatch({ type: EXPENSE_TABLE_SORT }) };
