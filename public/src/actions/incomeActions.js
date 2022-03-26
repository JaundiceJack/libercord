// Import action types
import {
  INCOME_LIST_REQUEST,   INCOME_LIST_SUCCESS,   INCOME_LIST_FAILURE,
  INCOME_GET_REQUEST,    INCOME_GET_SUCCESS,    INCOME_GET_FAILURE,
  INCOME_CREATE_REQUEST, INCOME_CREATE_SUCCESS, INCOME_CREATE_FAILURE,
  INCOME_EDIT_REQUEST,   INCOME_EDIT_SUCCESS,   INCOME_EDIT_FAILURE,
  INCOME_DELETE_REQUEST, INCOME_DELETE_SUCCESS, INCOME_DELETE_FAILURE,
  INCOME_ERROR_RESET,    INCOME_DIRECT_SELECT,
  INCOME_TOGGLE_ADDING,  INCOME_TOGGLE_EDITING, INCOME_TOGGLE_DELETING,
  INCOME_TABLE_SORT, USER_LOGIN_FAILURE
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report authorization errors
import { handleError, raiseError } from './errorActions';
import { inlineCreateCategory } from './categoryActions.js';
import { inlineCreateSource } from './sourceActions.js';

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

// Return all of the user's incomes
export const getIncomes = () => async (dispatch, getState) => {
  dispatch({ type: INCOME_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/incomes/', tokenConfig(getState));
    dispatch({ type: INCOME_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch(raiseError(e, INCOME_LIST_FAILURE)) }
}

// Return an income with the given id
export const getIncome = id => async (dispatch, getState) => {
  dispatch({ type: INCOME_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/incomes/${id}`, tokenConfig(getState));
    dispatch({ type: INCOME_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: INCOME_GET_FAILURE, payload: handleError(e) }) }
}

// Create a new income from the user entries
export const addIncome = income => async (dispatch, getState) => {
  dispatch({ type: INCOME_CREATE_REQUEST });
  try {
    // Create an income submission with source and category ids included
    const submission = {
      ...income,
      source: income.newSource ?
        await inlineCreateSource({ name: income.newSource }, dispatch, getState) :
        income.source,
      category: income.newCategory ?
        await inlineCreateCategory({ name: income.newCategory, type: 'income' }, dispatch, getState) :
        income.category
    }

    const { data } = await axios.post('/api/incomes/', submission, tokenConfig(getState));
    dispatch({ type: INCOME_CREATE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: INCOME_CREATE_FAILURE, payload: handleError(e) }) }
}

// Edit the income with the given id
export const editIncome = (id, income) => async (dispatch, getState) => {
  dispatch({ type: INCOME_EDIT_REQUEST });
  try {
    // Create an income submission with source and category ids included
    const submission = {
      ...income,
      source: income.newSource ?
        await inlineCreateSource({ name: income.newSource }, dispatch, getState) :
        income.source,
      category: income.newCategory ?
        await inlineCreateCategory({ name: income.newCategory, type: 'income' }, dispatch, getState) :
        income.category
    }

    const { data } = await axios.put(`/api/incomes/${id}`, submission, tokenConfig(getState));
    dispatch({ type: INCOME_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: INCOME_EDIT_FAILURE, payload: handleError(e) }) }
}



// Remove the selected income
export const deleteIncome = id => async (dispatch, getState) => {
  dispatch({ type: INCOME_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/incomes/${id}`, tokenConfig(getState));
    dispatch({ type: INCOME_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: INCOME_DELETE_FAILURE, payload: handleError(e) }) }
}

// Clear server/user error notifications
export const clearIncomeError = () => dispatch => {
  dispatch({ type: INCOME_ERROR_RESET });
}

// Toggle form states
export const toggleAdding = () => dispatch => { dispatch({ type: INCOME_TOGGLE_ADDING }) };
export const toggleEditing = () => dispatch => { dispatch({ type: INCOME_TOGGLE_EDITING }) };
export const toggleDeleting = () => dispatch => { dispatch({ type: INCOME_TOGGLE_DELETING }) };

// Set the given income as the selected
export const selectIncome = income => dispatch => {
  dispatch({ type: INCOME_DIRECT_SELECT, payload: income })}

// Sort the income table by ascending or descending
export const sortTable = () => dispatch => { dispatch({ type: INCOME_TABLE_SORT }) };
