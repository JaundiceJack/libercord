import {
  ASSET_LIST_REQUEST,   ASSET_LIST_SUCCESS,   ASSET_LIST_FAILURE,
  ASSET_GET_REQUEST,    ASSET_GET_SUCCESS,    ASSET_GET_FAILURE,
  ASSET_CREATE_REQUEST, ASSET_CREATE_SUCCESS, ASSET_CREATE_FAILURE,
  ASSET_EDIT_REQUEST,   ASSET_EDIT_SUCCESS,   ASSET_EDIT_FAILURE,
  ASSET_DELETE_REQUEST, ASSET_DELETE_SUCCESS, ASSET_DELETE_FAILURE,
  ASSET_ERROR_RESET,    ASSET_DIRECT_SELECT,
  ASSET_TOGGLE_ADDING,  ASSET_TOGGLE_EDITING, ASSET_TOGGLE_DELETING,
  ASSET_RESET
} from '../actions/types.js';

const initialState = {
  assets: [],
  selected: null,
  loading: false,
  error: null,
  adding: false,
  editing: false,
  deleting: false,
}

const assetReducer = (state = initialState, action) => {
  switch(action.type) {
    case ASSET_LIST_REQUEST:
    case ASSET_GET_REQUEST:
    case ASSET_CREATE_REQUEST:
    case ASSET_EDIT_REQUEST:
    case ASSET_DELETE_REQUEST:
      return { ...state, loading: true }
    case ASSET_LIST_FAILURE:
    case ASSET_GET_FAILURE:
    case ASSET_CREATE_FAILURE:
    case ASSET_EDIT_FAILURE:
    case ASSET_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case ASSET_LIST_SUCCESS:
      return { ...state, loading: false, assets: action.payload }
    case ASSET_GET_SUCCESS:
      return { ...state, loading: false, selected: action.payload }
    case ASSET_CREATE_SUCCESS:
      return {
        ...state,
        // Add the new asset to the end
        assets: [
          ...state.assets,
           action.payload
         ],
        selected: action.payload,
        adding: false,
        loading: false
      }
    case ASSET_EDIT_SUCCESS:
      return {
        ...state,
        // Filter out the asset with the payload's id and add the edited one to the end
        assets: [
          ...state.assets.filter(asset => asset._id !== action.payload._id),
          action.payload
        ],
        selected: action.payload,
        editing: false,
        loading: false
      }
    case ASSET_DELETE_SUCCESS:
      return {
        ...state,
        // Filter out the asset with the payload's id
        assets: [
          ...state.assets.filter(asset => asset._id !== action.payload)
        ],
        selected: null,
        deleting: false,
        loading: false
      }
    case ASSET_TOGGLE_ADDING: return { ...state, adding: !state.adding }
    case ASSET_TOGGLE_EDITING: return { ...state, editing: !state.editing }
    case ASSET_TOGGLE_DELETING: return { ...state, deleting: !state.deleting }
    case ASSET_DIRECT_SELECT: return { ...state, selected: action.payload }
    case ASSET_ERROR_RESET: return { ...state, error: null }
    case ASSET_RESET: return initialState
    default:
      return state;
  }
};

export default assetReducer;
