import {combineReducers} from 'redux';
import assetReducer from './assetReducer.js';
import expenseReducer from './expenseReducer.js';
import incomeReducer from './incomeReducer.js';
import liabilityReducer from './liabilityReducer.js';
import errorReducer from './errorReducer.js';
import authReducer from './authReducer.js';

export default combineReducers({
  asset: assetReducer,
  expense: expenseReducer,
  income: incomeReducer,
  liability: liabilityReducer,
  error: errorReducer,
  auth: authReducer,
})
