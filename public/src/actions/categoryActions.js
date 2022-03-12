// Import action types
import {
  CATEGORY_LIST_REQUEST,   CATEGORY_LIST_SUCCESS,   CATEGORY_LIST_FAILURE,
  CATEGORY_GET_REQUEST,    CATEGORY_GET_SUCCESS,    CATEGORY_GET_FAILURE,
  CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAILURE,
  CATEGORY_EDIT_REQUEST,   CATEGORY_EDIT_SUCCESS,   CATEGORY_EDIT_FAILURE,
  CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAILURE,
  CATEGORY_ERROR_RESET
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report authorization errors
import { handleError } from './errorActions';
//
import { getIncomes } from './incomeActions.js';
import { getExpenses } from './expenseActions.js';

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

// Return all of the categories
export const getCategories = () => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/categories/', tokenConfig(getState));
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: CATEGORY_LIST_FAILURE, payload: handleError(e) }) }
}

// Wait for a list of income sources from the server
export const asyncGetCategories = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    try {
      const { data } = await axios.get('/api/categories/', tokenConfig(getState));
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
      resolve(data);
    } catch (e) {
      dispatch({ type: CATEGORY_LIST_FAILURE, payload: handleError(e) });
      reject(e);
    }
  })
}

// Return an category with the given id
export const getCategory = id => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/categories/${id}`, tokenConfig(getState));
    dispatch({ type: CATEGORY_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: CATEGORY_GET_FAILURE, payload: handleError(e) }) }
}

// Create a new category from the entries
export const addCategory = category => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_CREATE_REQUEST });
  try {
    const { data } = await axios.post('/api/categories/', category, tokenConfig(getState));
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: CATEGORY_CREATE_FAILURE, payload: handleError(e) }); }
}

// Make a new category when entering income/expenses
export const inlineCreateCategory = (category, dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    dispatch({ type: CATEGORY_CREATE_REQUEST });
    try {
      const { data } = await axios.post('/api/categories/', category, tokenConfig(getState));
      dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
      resolve(data._id);
    } catch (e) {
      dispatch({ type: CATEGORY_CREATE_FAILURE, payload: handleError(e) });
      reject(e);
    }
  })
}

// Edit the category with the given id
export const editCategory = (id, category) => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_EDIT_REQUEST });
  try {
    const editedCategory = JSON.stringify(category);
    const { data } = await axios.put(`/api/categories/${id}`, editedCategory, tokenConfig(getState));
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: CATEGORY_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected category
export const deleteCategory = id => async (dispatch, getState) => {
  dispatch({ type: CATEGORY_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/categories/${id}`, tokenConfig(getState));
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
    // Reload the incomes/expenses to update deleted stuff
    dispatch(getIncomes());
    dispatch(getExpenses());
  } catch (e) { dispatch({ type: CATEGORY_DELETE_FAILURE, payload: handleError(e) }) }
}

// Clear server/user error notifications
export const clearCategoryError = () => dispatch => {
  dispatch({ type: CATEGORY_ERROR_RESET });
}
