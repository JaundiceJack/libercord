// Import action types
import {
  LOCATION_LIST_REQUEST,   LOCATION_LIST_SUCCESS,   LOCATION_LIST_FAILURE,
  LOCATION_GET_REQUEST,    LOCATION_GET_SUCCESS,    LOCATION_GET_FAILURE,
  LOCATION_CREATE_REQUEST, LOCATION_CREATE_SUCCESS, LOCATION_CREATE_FAILURE,
  LOCATION_EDIT_REQUEST,   LOCATION_EDIT_SUCCESS,   LOCATION_EDIT_FAILURE,
  LOCATION_DELETE_REQUEST, LOCATION_DELETE_SUCCESS, LOCATION_DELETE_FAILURE,
  LOCATION_ERROR_RESET,    LOCATION_DIRECT_SELECT,
  LOCATION_TOGGLE_ADDING,  LOCATION_TOGGLE_EDITING, LOCATION_TOGGLE_DELETING,
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report authorization errors
import { handleError } from './errorActions.js';
import { getIncomes } from './incomeActions.js';

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

// Return all of the user's locations
export const getLocations = () => async (dispatch, getState) => {
  dispatch({ type: LOCATION_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/locations/', tokenConfig(getState));
    dispatch({ type: LOCATION_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LOCATION_LIST_FAILURE, payload: handleError(e) }) }
}

// Wait for a list of expense locations from the server
export const asyncGetLocations = () => (dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    dispatch({ type: LOCATION_LIST_REQUEST });
    try {
      const { data } = await axios.get('/api/locations/', tokenConfig(getState));
      dispatch({ type: LOCATION_LIST_SUCCESS, payload: data });
      resolve(data);
    } catch (e) {
      dispatch({ type: LOCATION_LIST_FAILURE, payload: handleError(e) });
      reject(e);
    }
  })
}

// Return an location with the given id
export const getLocation = id => async (dispatch, getState) => {
  dispatch({ type: LOCATION_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/locations/${id}`, tokenConfig(getState));
    dispatch({ type: LOCATION_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LOCATION_GET_FAILURE, payload: handleError(e) }) }
}

// Create a new location from the user entries
export const addLocation = location => async (dispatch, getState) => {
  dispatch({ type: LOCATION_CREATE_REQUEST });
  try {
    const newLocation = JSON.stringify(location);
    const { data } = await axios.post('/api/locations/', newLocation, tokenConfig(getState));
    dispatch({ type: LOCATION_CREATE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LOCATION_CREATE_FAILURE, payload: handleError(e) }) }
}

// Make a new location when entering income, return the new location's id when done
export const inlineCreateLocation = (location, dispatch, getState) => {
  return new Promise(async (resolve, reject) => {
    dispatch({ type: LOCATION_CREATE_REQUEST });
    try {
      const { data } = await axios.post('/api/locations/', location, tokenConfig(getState));
      dispatch({ type: LOCATION_CREATE_SUCCESS, payload: data });
      resolve(data._id);
    } catch (e) {
      dispatch({ type: LOCATION_CREATE_FAILURE, payload: handleError(e) });
      reject(e);
    }
  })
}


// Edit the location with the given id
export const editLocation = (id, location) => async (dispatch, getState) => {
  dispatch({ type: LOCATION_EDIT_REQUEST });
  try {
    const editedLocation = JSON.stringify(location);
    const { data } = await axios.put(`/api/locations/${id}`, editedLocation, tokenConfig(getState));
    dispatch({ type: LOCATION_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LOCATION_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected location
export const deleteLocation = id => async (dispatch, getState) => {
  dispatch({ type: LOCATION_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/locations/${id}`, tokenConfig(getState));
    dispatch({ type: LOCATION_DELETE_SUCCESS, payload: data });
    // Update expenses after deleting
    dispatch(getIncomes());
  } catch (e) { dispatch({ type: LOCATION_DELETE_FAILURE, payload: handleError(e) }) }
}

// Toggle form states
export const toggleAdding = () => dispatch => { dispatch({ type: LOCATION_TOGGLE_ADDING }) };
export const toggleEditing = () => dispatch => { dispatch({ type: LOCATION_TOGGLE_EDITING }) };
export const toggleDeleting = () => dispatch => { dispatch({ type: LOCATION_TOGGLE_DELETING }) };

// Set the given location as the selected
export const selectLocation = location => dispatch => {
  dispatch({ type: LOCATION_DIRECT_SELECT, payload: location })}

// Clear server/user error notifications
export const clearLocationError = () => dispatch => {
  dispatch({ type: LOCATION_ERROR_RESET })}
