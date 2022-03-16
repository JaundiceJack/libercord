import { combineReducers } from 'redux';
import assetReducer from './assetReducer.js';
import expenseReducer from './expenseReducer.js';
import incomeReducer from './incomeReducer.js';
import liabilityReducer from './liabilityReducer.js';
import categoryReducer from './categoryReducer.js';
import userReducer from './userReducer.js';
import pageReducer from './pageReducer.js';
import locationReducer from './locationReducer.js';
import sourceReducer from './sourceReducer.js';
import resetReducer from './resetReducer.js';

export default combineReducers({
  asset: assetReducer,
  expense: expenseReducer,
  income: incomeReducer,
  liability: liabilityReducer,
  category: categoryReducer,
  user: userReducer,
  page: pageReducer,
  location: locationReducer,
  source: sourceReducer,
  reset: resetReducer,
})
