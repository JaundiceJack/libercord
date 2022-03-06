import {
  LIABILITY_LIST_REQUEST,   LIABILITY_LIST_SUCCESS,   LIABILITY_LIST_FAILURE,
  LIABILITY_GET_REQUEST,    LIABILITY_GET_SUCCESS,    LIABILITY_GET_FAILURE,
  LIABILITY_CREATE_REQUEST, LIABILITY_CREATE_SUCCESS, LIABILITY_CREATE_FAILURE,
  LIABILITY_EDIT_REQUEST,   LIABILITY_EDIT_SUCCESS,   LIABILITY_EDIT_FAILURE,
  LIABILITY_DELETE_REQUEST, LIABILITY_DELETE_SUCCESS, LIABILITY_DELETE_FAILURE,
  LIABILITY_ERROR_RESET,    LIABILITY_DIRECT_SELECT,
  LIABILITY_TOGGLE_ADDING,  LIABILITY_TOGGLE_EDITING, LIABILITY_TOGGLE_DELETING
} from '../actions/types.js';

const initialState = {
  liabilities: [],
  selected: null,
  loading: false,
  error: null,
  adding: false,
  editing: false,
  deleting: false,
}

const liabilityReducer = (state = initialState, action) => {
  switch(action.type) {
    case LIABILITY_LIST_REQUEST:
    case LIABILITY_GET_REQUEST:
    case LIABILITY_CREATE_REQUEST:
    case LIABILITY_EDIT_REQUEST:
    case LIABILITY_DELETE_REQUEST:
      return { ...state, loading: true }
    case LIABILITY_LIST_FAILURE:
    case LIABILITY_GET_FAILURE:
    case LIABILITY_CREATE_FAILURE:
    case LIABILITY_EDIT_FAILURE:
    case LIABILITY_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case LIABILITY_LIST_SUCCESS:
      return { ...state, loading: false, liabilities: action.payload }
    case LIABILITY_GET_SUCCESS:
      return { ...state, loading: false, selected: action.payload }
    case LIABILITY_CREATE_SUCCESS:
      return {
        ...state,
        // Add the new liability to the end
        liabilities: [
          ...state.liabilities,
           action.payload
         ],
        selected: action.payload,
        adding: false,
        loading: false
      }
    case LIABILITY_EDIT_SUCCESS:
      return {
        ...state,
        // Filter out the liability with the payload's id and add the edited one to the end
        liabilities: [
          ...state.liabilities.filter(liability => liability._id !== action.payload._id),
          action.payload
        ],
        selected: action.payload,
        editing: false,
        loading: false
      }
    case LIABILITY_DELETE_SUCCESS:
      return {
        ...state,
        // Filter out the liability with the payload's id
        liabilities: [
          ...state.liabilities.filter(liability => liability._id !== action.payload)
        ],
        selected: null,
        deleting: false,
        loading: false
      }
    case LIABILITY_TOGGLE_ADDING: return { ...state, adding: !state.adding }
    case LIABILITY_TOGGLE_EDITING: return { ...state, editing: !state.editing }
    case LIABILITY_TOGGLE_DELETING: return { ...state, deleting: !state.deleting }
    case LIABILITY_DIRECT_SELECT: return { ...state, selected: action.payload }
    default:
      return state;
  }
};

export default liabilityReducer;
