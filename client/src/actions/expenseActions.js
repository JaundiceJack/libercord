import axios from 'axios';
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  LOADING_EXPENSES
} from './types.js';

export const getExpenses = () => dispatch => {
  dispatch(setExpensesLoading());
  axios.get('/api/expenses')
  .then(res => dispatch({
    type: GET_EXPENSES,
    payload: res.data
  }))
}

export const addExpense = expense => dispatch => {
  axios
    .post('/api/expenses', expense)
    .then(res =>
      dispatch({
        type: ADD_EXPENSE,
        payload: res.data
      })
    )
}

export const deleteExpense = id => dispatch => {
  axios
  .delete(`/api/expenses/${id}`)
  .then(res =>
    dispatch({
      type: DELETE_EXPENSE,
      payload: id
    })
  )
}

export const setExpensesLoading = () => {
  return { type: LOADING_EXPENSES }
}
