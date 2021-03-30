import {
  GET_ASSETS,
  ADD_ASSET,
  DELETE_ASSET,
  LOADING_ASSETS
} from '../actions/types.js';

const initialState = {
  assets: [],
  loading: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_ASSETS:
      return {
        ...state,
        assets: action.payload,
        loading: false
      }
    case DELETE_ASSET:
      return {
        ...state,
        assets: state.assets.filter(asset => asset._id !== action.payload)
      }
    case ADD_ASSET:
      return {
        ...state,
        assets: [...state.assets, action.payload]
      }
    case LOADING_ASSETS:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}
