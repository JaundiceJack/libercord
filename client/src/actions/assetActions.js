
// Import action types
import {
  GET_ASSETS,
  ADD_ASSET,
  DELETE_ASSET,
  LOADING_ASSETS
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import token config to authorize updates and returnErrors to register errors
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Return all of the user's assets
export const getAssets= () => (dispatch, getState) => {
  dispatch(setAssetsLoading());
  // Get the user id
  const user = getState().auth.user;
  const user_id = user ? user.id : "BadRequest";
  // Create an authorization token and get the assets
  axios.get('/api/assets/' + user_id, tokenConfig(getState))
  .then(res => dispatch({ type: GET_ASSETS, payload: res.data }))
  .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// Create a new asset from the user entries
export const addAsset = asset => (dispatch, getState) => {
  // Get the user id
  const user = getState().auth.user;
  if (user.id) {
    // Convert the new asset to JSON and add in the user's id
    const newAsset = JSON.stringify({...asset, user_id: user.id});
    // Submit a post with the new asset and the json web token
    axios.post('/api/assets', newAsset, tokenConfig(getState))
    .then(res =>
      // If successful, add the asset to the current state
      dispatch({ type: ADD_ASSET, payload: res.data }))
    .catch(err =>
      // If unsuccessful, display the errors
      dispatch(returnErrors(err.response.data, err.response.status)));
  }
}

// Remove the selected asset
export const deleteAsset = id => (dispatch, getState) => {
  axios.delete(`/api/assets/${id}`, tokenConfig(getState))
  .then(res =>
    dispatch({ type: DELETE_ASSET, payload: id })
  )
}

// Set the assets to loading for spinner animations & etc.
export const setAssetsLoading = () => { return { type: LOADING_ASSETS } }
