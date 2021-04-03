import {
  GET_LIABILITIES,
  ADD_LIABILITY,
  DELETE_LIABILITY,
  LOADING_LIABILITIES
} from '../actions/types.js';

const initialState = {
  liabilities: [],
  loading: false
}

const liabilityReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_LIABILITIES:
      return {
        ...state,
        liabilities: action.payload,
        loading: false
      }
    case DELETE_LIABILITY:
      return {
        ...state,
        liabilities: state.liabilities.filter(liability => liability._id !== action.payload)
      }
    case ADD_LIABILITY:
      return {
        ...state,
        liabilities: [...state.liabilities, action.payload]
      }
    case LOADING_LIABILITIES:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};

export default liabilityReducer;
