import axios from 'axios';
import {
  GET_ASSETS,
  ADD_ASSET,
  DELETE_ASSET,
  LOADING_ASSETS
} from './types.js';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getAssets = () => dispatch => {
  dispatch(setAssetsLoading());
  axios.get('/api/assets')
  .then(res => dispatch({
    type: GET_ASSETS,
    payload: res.data
  }))
  .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const addAsset = asset => (dispatch, getState) => {
  axios
    .post('/api/assets', asset, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ASSET,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const deleteAsset = id => (dispatch, getState) => {
  axios
  .delete(`/api/assets/${id}`, tokenConfig(getState))
  .then(res =>
    dispatch({
      type: DELETE_ASSET,
      payload: id
    })
  )
}

export const setAssetsLoading = () => {
  return { type: LOADING_ASSETS }
}
