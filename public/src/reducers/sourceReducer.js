// Import action types
import {
  SOURCE_LIST_REQUEST,   SOURCE_LIST_SUCCESS,   SOURCE_LIST_FAILURE,
  SOURCE_GET_REQUEST,    SOURCE_GET_SUCCESS,    SOURCE_GET_FAILURE,
  SOURCE_CREATE_REQUEST, SOURCE_CREATE_SUCCESS, SOURCE_CREATE_FAILURE,
  SOURCE_EDIT_REQUEST,   SOURCE_EDIT_SUCCESS,   SOURCE_EDIT_FAILURE,
  SOURCE_DELETE_REQUEST, SOURCE_DELETE_SUCCESS, SOURCE_DELETE_FAILURE,
  SOURCE_ERROR_RESET,    SOURCE_DIRECT_SELECT,
  SOURCE_TOGGLE_ADDING,  SOURCE_TOGGLE_EDITING, SOURCE_TOGGLE_DELETING,
  SOURCE_RESET
} from '../actions/types.js';

const initialState = {
  sources:  [],
  selected: null,
  error:    null,
  loading:  false,
  adding:   false,
  editing:  false,
  deleting: false,
}

const locationReducer = (state = initialState, action) => {
  switch(action.type) {
    case SOURCE_LIST_REQUEST:
    case SOURCE_GET_REQUEST:
    case SOURCE_CREATE_REQUEST:
    case SOURCE_EDIT_REQUEST:
    case SOURCE_DELETE_REQUEST:
      return { ...state, loading: true }
    case SOURCE_LIST_FAILURE:
    case SOURCE_GET_FAILURE:
    case SOURCE_CREATE_FAILURE:
    case SOURCE_EDIT_FAILURE:
    case SOURCE_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case SOURCE_LIST_SUCCESS:
      return { ...state, loading: false, sources: action.payload }
    case SOURCE_GET_SUCCESS:
      return { ...state, loading: false }
    case SOURCE_CREATE_SUCCESS:
      const existing = state.sources.find(elem => {
        return elem._id === action.payload._id });
      return {
        ...state,
        sources: existing ?
          [...state.sources] :
          [...state.sources, action.payload],
        selected: action.payload,
        adding: false,
        loading: false
      }
    case SOURCE_EDIT_SUCCESS:
      return {
        ...state,
      sources: [
          ...state.sources.filter(location => location._id !== action.payload._id),
          action.payload
        ],
        editing: false,
        loading: false
      }
    case SOURCE_DELETE_SUCCESS:
      return {
        ...state,
      sources: [
          ...state.sources.filter(location => location._id !== action.payload)
        ],
        deleting: false,
        loading: false
      }
    case SOURCE_TOGGLE_ADDING: return { ...state, adding: !state.adding }
    case SOURCE_TOGGLE_EDITING: return { ...state, editing: !state.editing }
    case SOURCE_TOGGLE_DELETING: return { ...state, deleting: !state.deleting }
    case SOURCE_DIRECT_SELECT: return { ...state, selected: action.payload }
    case SOURCE_ERROR_RESET: return { ...state, error: null }
    case SOURCE_RESET: return initialState;
    default:
      return state;
  }
};

export default locationReducer;
