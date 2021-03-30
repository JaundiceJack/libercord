import axios from 'axios';
import {
  GET_INCOMES,
  ADD_INCOME,
  DELETE_INCOME,
  LOADING_INCOMES
} from './types.js';

export const getIncomes = () => dispatch => {
  dispatch(setIncomesLoading());
  axios.get('/api/incomes')
  .then(res => dispatch({
    type: GET_INCOMES,
    payload: res.data
  }))
}

export const addIncome = income => dispatch => {
  axios
    .post('/api/incomes', income)
    .then(res =>
      dispatch({
        type: ADD_INCOME,
        payload: res.data
      })
    )
}

export const deleteIncome = id => dispatch => {
  axios
  .delete(`/api/incomes/${id}`)
  .then(res =>
    dispatch({
      type: DELETE_INCOME,
      payload: id
    })
  )
}

export const setIncomesLoading = () => {
  return { type: LOADING_INCOMES }
}
