import axios from 'axios';
import {
  GET_ASSETS,
  ADD_ASSET,
  DELETE_ASSET,
  LOADING_ASSETS
} from './types.js';

export const getAssets = () => dispatch => {
  dispatch(setAssetsLoading());
  axios.get('/api/assets')
  .then(res => dispatch({
    type: GET_ASSETS,
    payload: res.data
  }))
}

export const addAsset = asset => dispatch => {
  axios
    .post('/api/assets', asset)
    .then(res =>
      dispatch({
        type: ADD_ASSET,
        payload: res.data
      })
    )
}

export const deleteAsset = id => dispatch => {
  axios
  .delete(`/api/assets/${id}`)
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
