import axios from 'axios';
import {
  GET_LIABILITIES,
  ADD_LIABILITY,
  DELETE_LIABILITY,
  LOADING_LIABILITIES
} from './types.js';

export const getLiabilities = () => dispatch => {
  dispatch(setLiabilitiesLoading());
  axios.get('/api/liabilities')
  .then(res => dispatch({
    type: GET_LIABILITIES,
    payload: res.data
  }))
}

export const addLiability = liability => dispatch => {
  axios
    .post('/api/liabilities', liability)
    .then(res =>
      dispatch({
        type: ADD_LIABILITY,
        payload: res.data
      })
    )
}

export const deleteLiability = id => dispatch => {
  axios
  .delete(`/api/liabilities/${id}`)
  .then(res =>
    dispatch({
      type: DELETE_LIABILITY,
      payload: id
    })
  )
}

export const setLiabilitiesLoading = () => {
  return { type: LOADING_LIABILITIES }
}
