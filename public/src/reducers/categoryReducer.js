import {
  CATEGORY_LIST_REQUEST,   CATEGORY_LIST_SUCCESS,   CATEGORY_LIST_FAILURE,
  CATEGORY_GET_REQUEST,    CATEGORY_GET_SUCCESS,    CATEGORY_GET_FAILURE,
  CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAILURE,
  CATEGORY_EDIT_REQUEST,   CATEGORY_EDIT_SUCCESS,   CATEGORY_EDIT_FAILURE,
  CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAILURE,
  CATEGORY_ERROR_RESET, CATEGORY_RESET
} from '../actions/types.js';

const initialState = {
  categories: [],
  selected: null,
  error:    null,
  loading:  false,
  adding:   false,
  editing:  false,
  deleting: false,
}

const categoryReducer = (state = initialState, action) => {
  switch(action.type) {
    case CATEGORY_LIST_REQUEST:
    case CATEGORY_GET_REQUEST:
    case CATEGORY_CREATE_REQUEST:
    case CATEGORY_EDIT_REQUEST:
    case CATEGORY_DELETE_REQUEST:
      return { ...state, loading: true }
    case CATEGORY_LIST_FAILURE:
    case CATEGORY_GET_FAILURE:
    case CATEGORY_CREATE_FAILURE:
    case CATEGORY_EDIT_FAILURE:
    case CATEGORY_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case CATEGORY_LIST_SUCCESS:
      return { ...state, loading: false, categories: action.payload }
    case CATEGORY_GET_SUCCESS:
      return { ...state, loading: false }
    case CATEGORY_CREATE_SUCCESS:
      const existing = state.categories.find(elem => {
        return elem._id === action.payload._id })
      return { ...state,
        categories: existing ?
          [...state.categories] :
          [...state.categories, action.payload],
        selected: action.payload,
        adding: false,
        loading: false
      }
    case CATEGORY_EDIT_SUCCESS:
      return {
        ...state,
        categories: [
          ...state.categories.filter(category => category._id !== action.payload._id),
          action.payload
        ],
        editing: false,
        loading: false
      }
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        categories: [
          ...state.categories.filter(category => category._id !== action.payload)
        ],
        deleting: false,
        loading: false
      }
    case CATEGORY_ERROR_RESET: return { ...state, error: null }
    case CATEGORY_RESET: return initialState
    default:
      return state;
  }
};

export default categoryReducer;
