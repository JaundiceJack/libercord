// Import action types
import {
  SOURCE_LIST_REQUEST,   SOURCE_LIST_SUCCESS,   SOURCE_LIST_FAILURE,
  SOURCE_GET_REQUEST,    SOURCE_GET_SUCCESS,    SOURCE_GET_FAILURE,
  SOURCE_CREATE_REQUEST, SOURCE_CREATE_SUCCESS, SOURCE_CREATE_FAILURE,
  SOURCE_EDIT_REQUEST,   SOURCE_EDIT_SUCCESS,   SOURCE_EDIT_FAILURE,
  SOURCE_DELETE_REQUEST, SOURCE_DELETE_SUCCESS, SOURCE_DELETE_FAILURE,
  SOURCE_ERROR_RESET,    SOURCE_DIRECT_SELECT,
  SOURCE_TOGGLE_ADDING,  SOURCE_TOGGLE_EDITING, SOURCE_TOGGLE_DELETING,
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

// Return all of the user's sources
export const getSources = () => async (dispatch, getState) => {
  dispatch({ type: SOURCE_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/sources/', tokenConfig(getState));
    dispatch({ type: SOURCE_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: SOURCE_LIST_FAILURE, payload: handleError(e) }) }
}

// Return an source with the given id
export const getSource = id => async (dispatch, getState) => {
  dispatch({ type: SOURCE_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/sources/${id}`, tokenConfig(getState));
    dispatch({ type: SOURCE_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: SOURCE_GET_FAILURE, payload: handleError(e) }) }
}

// Create a new source from the user entries
export const addSource = source => async (dispatch, getState) => {
  dispatch({ type: SOURCE_CREATE_REQUEST });
  try {
    const newSource = JSON.stringify(source);
    const { data } = await axios.post('/api/sources/', newSource, tokenConfig(getState));
    dispatch({ type: SOURCE_CREATE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: SOURCE_CREATE_FAILURE, payload: handleError(e) }) }
}

// Edit the source with the given id
export const editSource = (id, source) => async (dispatch, getState) => {
  dispatch({ type: SOURCE_EDIT_REQUEST });
  try {
    const editedSource = JSON.stringify(source);
    const { data } = await axios.put(`/api/sources/${id}`, editedSource, tokenConfig(getState));
    dispatch({ type: SOURCE_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: SOURCE_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected source
export const deleteSource = id => async (dispatch, getState) => {
  dispatch({ type: SOURCE_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/sources/${id}`, tokenConfig(getState));
    dispatch({ type: SOURCE_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: SOURCE_DELETE_FAILURE, payload: handleError(e) }) }
}

// Toggle form states
export const toggleAdding = () => dispatch => { dispatch({ type: SOURCE_TOGGLE_ADDING }) };
export const toggleEditing = () => dispatch => { dispatch({ type: SOURCE_TOGGLE_EDITING }) };
export const toggleDeleting = () => dispatch => { dispatch({ type: SOURCE_TOGGLE_DELETING }) };

// Set the given source as the selected
export const selectSource = source => dispatch => {
  dispatch({ type: SOURCE_DIRECT_SELECT, payload: source })}

// Clear server/user error notifications
export const clearSourceError = () => dispatch => {
  dispatch({ type: SOURCE_ERROR_RESET })}
