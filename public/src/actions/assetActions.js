// Import action types
import {
  ASSET_LIST_REQUEST,   ASSET_LIST_SUCCESS,   ASSET_LIST_FAILURE,
  ASSET_GET_REQUEST,    ASSET_GET_SUCCESS,    ASSET_GET_FAILURE,
  ASSET_CREATE_REQUEST, ASSET_CREATE_SUCCESS, ASSET_CREATE_FAILURE,
  ASSET_EDIT_REQUEST,   ASSET_EDIT_SUCCESS,   ASSET_EDIT_FAILURE,
  ASSET_DELETE_REQUEST, ASSET_DELETE_SUCCESS, ASSET_DELETE_FAILURE,
  ASSET_ERROR_RESET,    ASSET_DIRECT_SELECT,
  ASSET_TOGGLE_ADDING,  ASSET_TOGGLE_EDITING, ASSET_TOGGLE_DELETING
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
//const basicConfig = { headers: { "Content-type": "application/json" } };

// Return all of the user's assets
export const getAssets = () => async (dispatch, getState) => {
  dispatch({ type: ASSET_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/assets/', tokenConfig(getState));
    dispatch({ type: ASSET_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: ASSET_LIST_FAILURE, payload: handleError(e) }) }
}

// Return an asset with the given id
export const getAsset = id => async (dispatch, getState) => {
  dispatch({ type: ASSET_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/assets/${id}`, tokenConfig(getState));
    dispatch({ type: ASSET_GET_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: ASSET_GET_FAILURE, payload: handleError(e) }) }
}

// Create a new asset from the user entries
export const addAsset = asset => async (dispatch, getState) => {
  dispatch({ type: ASSET_CREATE_REQUEST });
  try {
    const newAsset = JSON.stringify(asset);
    const { data } = await axios.post('/api/assets/', newAsset, tokenConfig(getState));
    dispatch({ type: ASSET_CREATE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: ASSET_CREATE_FAILURE, payload: handleError(e) }) }
}

// Edit the asset with the given id
export const editAsset = (id, asset) => async (dispatch, getState) => {
  dispatch({ type: ASSET_EDIT_REQUEST });
  try {
    const editedAsset = JSON.stringify(asset);
    const { data } = await axios.put(`/api/assets/${id}`, editedAsset, tokenConfig(getState));
    dispatch({ type: ASSET_EDIT_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: ASSET_EDIT_FAILURE, payload: handleError(e) }) }
}

// Remove the selected asset
export const deleteAsset = id => async (dispatch, getState) => {
  dispatch({ type: ASSET_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/assets/${id}`);
    dispatch({ type: ASSET_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: ASSET_DELETE_FAILURE, payload: handleError(e) }) }
}

// Toggle form states
export const toggleAdding = () => dispatch => { dispatch({ type: ASSET_TOGGLE_ADDING }) };
export const toggleEditing = () => dispatch => { dispatch({ type: ASSET_TOGGLE_EDITING }) };
export const toggleDeleting = () => dispatch => { dispatch({ type: ASSET_TOGGLE_DELETING }) };

// Set the given asset as the selected
export const selectAsset = asset => dispatch => {
  dispatch({ type: ASSET_DIRECT_SELECT, payload: asset })}

// Clear server/user error notifications
export const clearAssetError = () => dispatch => {
  dispatch({ type: ASSET_ERROR_RESET });
}
