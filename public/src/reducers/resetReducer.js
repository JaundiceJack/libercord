import {
  RESET_EMAIL_REQUEST, RESET_EMAIL_SUCCESS, RESET_EMAIL_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
  RESET_ERROR_RESET, RESET_MESSAGE_RESET
} from '../actions/types'

const initialState = {
  message: null,
  loading: false,
  error: null,
}

const resetReducer = (state = initialState, action) => {
  switch(action.type) {
    case RESET_EMAIL_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case RESET_EMAIL_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RESET_EMAIL_SUCCESS:
      return { ...state, loading: false, message: action.payload.msg };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case RESET_ERROR_RESET:
      return { ...state, error: null, message: null };
    case RESET_MESSAGE_RESET:
      return { ...state, message: null }
    default:
      return state;
  }
};

export default resetReducer;
