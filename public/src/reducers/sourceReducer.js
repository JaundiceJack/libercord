// Import action types
import {
  SOURCE_LIST_REQUEST,   SOURCE_LIST_SUCCESS,   SOURCE_LIST_FAILURE,
  SOURCE_GET_REQUEST,    SOURCE_GET_SUCCESS,    SOURCE_GET_FAILURE,
  SOURCE_CREATE_REQUEST, SOURCE_CREATE_SUCCESS, SOURCE_CREATE_FAILURE,
  SOURCE_EDIT_REQUEST,   SOURCE_EDIT_SUCCESS,   SOURCE_EDIT_FAILURE,
  SOURCE_DELETE_REQUEST, SOURCE_DELETE_SUCCESS, SOURCE_DELETE_FAILURE,
  SOURCE_ERROR_RESET,    SOURCE_DIRECT_SELECT,
  SOURCE_TOGGLE_ADDING,  SOURCE_TOGGLE_EDITING, SOURCE_TOGGLE_DELETING,
} from '../actions/types.js';

const initialState = {
sources: [],
  loading: false,
  error: null,
  adding: false,
  editing: false,
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
      return { ...state, loading: false, locations: action.payload }
    case SOURCE_GET_SUCCESS:
      return { ...state, loading: false }
    case SOURCE_CREATE_SUCCESS:
      return {
        ...state,
      sources: [
          ...state.locations,
           action.payload
         ],
        adding: false,
        loading: false
      }
    case SOURCE_EDIT_SUCCESS:
      return {
        ...state,
      sources: [
          ...state.locations.filter(location => location._id !== action.payload._id),
          action.payload
        ],
        editing: false,
        loading: false
      }
    case SOURCE_DELETE_SUCCESS:
      return {
        ...state,
      sources: [
          ...state.locations.filter(location => location._id !== action.payload)
        ],
        deleting: false,
        loading: false
      }
    case SOURCE_ERROR_RESET:
      return { ...state, error: null }
    default:
      return state;
  }
};

export default locationReducer;
