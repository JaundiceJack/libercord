// Import action types
import {
  LIABILITY_LIST_REQUEST,   LIABILITY_LIST_SUCCESS,   LIABILITY_LIST_FAILURE,
  LIABILITY_GET_REQUEST,    LIABILITY_GET_SUCCESS,    LIABILITY_GET_FAILURE,
  LIABILITY_CREATE_REQUEST, LIABILITY_CREATE_SUCCESS, LIABILITY_CREATE_FAILURE,
  LIABILITY_EDIT_REQUEST,   LIABILITY_EDIT_SUCCESS,   LIABILITY_EDIT_FAILURE,
  LIABILITY_DELETE_REQUEST, LIABILITY_DELETE_SUCCESS, LIABILITY_DELETE_FAILURE,
  LIABILITY_ERROR_RESET,    LIABILITY_DIRECT_SELECT,
  LIABILITY_TOGGLE_ADDING,  LIABILITY_TOGGLE_EDITING, LIABILITY_TOGGLE_DELETING
} from './types.js';
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

// Return all of the user's liabilities
export const getLiabilities = () => async (dispatch, getState) => {
  dispatch({ type: LIABILITY_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/liabilities/', tokenConfig(getState));
    dispatch({ type: LIABILITY_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LIABILITY_LIST_FAILURE, payload: handleError(e) }) }
}

// Return an liability with the given id
export const getLiability = id => async (dispatch, getState) => {
  dispatch({ type: LIABILITY_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/liabilities/${id}`, tokenConfig(getState));
    dispatch({ type: LIABILITY_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LIABILITY_GET_FAILURE, payload: handleError(e) }) }
}

// Create a new liability from the user entries
export const addLiability = liability => async (dispatch, getState) => {
  dispatch({ type: LIABILITY_CREATE_REQUEST });
  try {
    const newLiability = JSON.stringify(liability);
    const { data } = await axios.post('/api/liabilities/', newLiability, tokenConfig(getState));
    dispatch({ type: LIABILITY_CREATE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LIABILITY_CREATE_FAILURE, payload: handleError(e) }) }
}

// Edit the liability with the given id
export const editLiability = (id, liability) => async (dispatch, getState) => {
  dispatch({ type: LIABILITY_EDIT_REQUEST });
  try {
    const editedLiability = JSON.stringify(liability);
    const { data } = await axios.put(`/api/liabilities/${id}`, editedLiability, tokenConfig(getState));
    dispatch({ type: LIABILITY_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LIABILITY_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected liability
export const deleteLiability = id => async (dispatch, getState) => {
  dispatch({ type: LIABILITY_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/liabilities/${id}`);
    dispatch({ type: LIABILITY_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LIABILITY_DELETE_FAILURE, payload: handleError(e) }) }
}

// Toggle form states
export const toggleAdding = () => dispatch => { dispatch({ type: LIABILITY_TOGGLE_ADDING }) };
export const toggleEditing = () => dispatch => { dispatch({ type: LIABILITY_TOGGLE_EDITING }) };
export const toggleDeleting = () => dispatch => { dispatch({ type: LIABILITY_TOGGLE_DELETING }) };

// Set the given liability as the selected
export const selectLiability = liability => dispatch => {
  dispatch({ type: LIABILITY_DIRECT_SELECT, payload: liability })}
