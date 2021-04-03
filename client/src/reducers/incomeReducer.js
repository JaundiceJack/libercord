import {
  GET_INCOMES,
  ADD_INCOME,
  DELETE_INCOME,
  LOADING_INCOMES
} from '../actions/types.js';

const initialState = {
  incomes: [],
  loading: false
}

const incomeReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INCOMES:
      return {
        ...state,
        incomes: action.payload,
        loading: false
      }
    case DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter(income => income._id !== action.payload)
      }
    case ADD_INCOME:
      return {
        ...state,
        incomes: [...state.incomes, action.payload]
      }
    case LOADING_INCOMES:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};

export default incomeReducer;
