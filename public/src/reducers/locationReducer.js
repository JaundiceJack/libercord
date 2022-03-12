// Import action types
import {
  LOCATION_LIST_REQUEST,   LOCATION_LIST_SUCCESS,   LOCATION_LIST_FAILURE,
  LOCATION_GET_REQUEST,    LOCATION_GET_SUCCESS,    LOCATION_GET_FAILURE,
  LOCATION_CREATE_REQUEST, LOCATION_CREATE_SUCCESS, LOCATION_CREATE_FAILURE,
  LOCATION_EDIT_REQUEST,   LOCATION_EDIT_SUCCESS,   LOCATION_EDIT_FAILURE,
  LOCATION_DELETE_REQUEST, LOCATION_DELETE_SUCCESS, LOCATION_DELETE_FAILURE,
  LOCATION_ERROR_RESET,    LOCATION_DIRECT_SELECT,
  LOCATION_TOGGLE_ADDING,  LOCATION_TOGGLE_EDITING, LOCATION_TOGGLE_DELETING,
  LOCATION_RESET
} from '../actions/types.js';


const initialState = {
  locations: [],
  selected: null,
  error:    null,
  loading:  false,
  adding:   false,
  editing:  false,
  deleting: false,
}

const locationReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOCATION_LIST_REQUEST:
    case LOCATION_GET_REQUEST:
    case LOCATION_CREATE_REQUEST:
    case LOCATION_EDIT_REQUEST:
    case LOCATION_DELETE_REQUEST:
      return { ...state, loading: true }
    case LOCATION_LIST_FAILURE:
    case LOCATION_GET_FAILURE:
    case LOCATION_CREATE_FAILURE:
    case LOCATION_EDIT_FAILURE:
    case LOCATION_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case LOCATION_LIST_SUCCESS:
      return { ...state, loading: false, locations: action.payload }
    case LOCATION_GET_SUCCESS:
      return { ...state, loading: false }
    case LOCATION_CREATE_SUCCESS:
      const existing = state.locations.find(elem => {
        return elem._id === action.payload._id });
      return {
        ...state,
        locations: existing ?
          [...state.locations] :
          [...state.locations, action.payload],
        selected: action.payload,
        adding: false,
        loading: false
      }
    case LOCATION_EDIT_SUCCESS:
      return {
        ...state,
        locations: [
          ...state.locations.filter(location => location._id !== action.payload._id),
          action.payload
        ],
        editing: false,
        loading: false
      }
    case LOCATION_DELETE_SUCCESS:
      return {
        ...state,
        locations: [
          ...state.locations.filter(location => location._id !== action.payload)
        ],
        deleting: false,
        loading: false
      }
    case LOCATION_TOGGLE_ADDING: return { ...state, adding: !state.adding }
    case LOCATION_TOGGLE_EDITING: return { ...state, editing: !state.editing }
    case LOCATION_TOGGLE_DELETING: return { ...state, deleting: !state.deleting }
    case LOCATION_DIRECT_SELECT: return { ...state, selected: action.payload }
    case LOCATION_ERROR_RESET: return { ...state, error: null }
    case LOCATION_RESET: return initialState;
    default:
      return state;
  }
};

export default locationReducer;
