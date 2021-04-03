// Import action types
import {
  GET_LIABILITIES,
  ADD_LIABILITY,
  DELETE_LIABILITY,
  LOADING_LIABILITIES
} from './types.js';
// Import axios to handle http requests
import axios from 'axios';
// Import token config to authorize updates and returnErrors to register errors
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Return all of the user's liabilities
export const getLiabilities= () => (dispatch, getState) => {
  dispatch(setLiabilitiesLoading());
  // Get the user id
  const user = getState().auth.user;
  if (user) {
    // Create an authorization token and get the liabilities
    axios.get('/api/liabilities/' + user.id, tokenConfig(getState))
    .then(res => dispatch({ type: GET_LIABILITIES, payload: res.data }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
  }
  else console.log("User not in client memory.");
}

// Create a new liability from the user entries
export const addLiability = liability => (dispatch, getState) => {
  // Get the user id
  const user = getState().auth.user;
  if (user.id) {
    // Convert the new liability to JSON and add in the user's id
    const newLiability = JSON.stringify({...liability, user_id: user.id});
    // Submit a post with the new liability and the json web token
    axios.post('/api/liabilities', newLiability, tokenConfig(getState))
    .then(res =>
      // If successful, add the liability to the current state
      dispatch({ type: ADD_LIABILITY, payload: res.data }))
    .catch(err =>
      // If unsuccessful, display the errors
      dispatch(returnErrors(err.response.data, err.response.status)));
  }
}

// Remove the selected liability
export const deleteLiability = id => (dispatch, getState) => {
  axios.delete(`/api/liabilities/${id}`, tokenConfig(getState))
  .then(res =>
    dispatch({ type: DELETE_LIABILITY, payload: id })
  )
}

// Set the liabilities to loading for spinner animations & etc.
export const setLiabilitiesLoading = () => { return { type: LOADING_LIABILITIES } }
