import {
  SET_PAGE, SET_SECTION
} from '../actions/types.js';

const initialState = {
  page: 'home',
  section: 'summary'
}

const pageReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PAGE:
      return { ...state, page: action.payload }
    case SET_SECTION:
      return { ...state, section: action.payload }
    default:
      return state;
  }
};

export default pageReducer;
