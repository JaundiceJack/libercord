import {
  USER_GET_REQUEST,      USER_GET_SUCCESS,      USER_GET_FAILURE,
  USER_LOGIN_REQUEST,    USER_LOGIN_SUCCESS,    USER_LOGIN_FAILURE,
  USER_LOGOUT_REQUEST,   USER_LOGOUT_SUCCESS,   USER_LOGOUT_FAILURE,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
  USER_EDIT_REQUEST,     USER_EDIT_SUCCESS,     USER_EDIT_FAILURE,
  USER_ERROR_RESET,      USER_DETAILS_RESET,
  BALANCE_TOGGLE_EDITING
} from '../actions/types'

const initialState = {
  token: window.localStorage.getItem('token'),
  authenticated: false,
  loading: false,
  user: {},
  error: null,
  editingBalance: false
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_GET_REQUEST:
    case USER_LOGIN_REQUEST:
    case USER_LOGOUT_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_EDIT_REQUEST:
      return { ...state, loading: true };
    case USER_GET_FAILURE:
    case USER_LOGOUT_FAILURE:
    case USER_EDIT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case USER_GET_SUCCESS:
      return { ...state, loading: false, authenticated: true,
        user: action.payload
      };
    case USER_EDIT_SUCCESS:
      return { ...state, loading: false, editingBalance: false, user: action.payload };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      window.localStorage.setItem('token', action.payload.token);
      return { ...state, loading: false, user: action.payload,
        authenticated: true,
      };
    case USER_LOGOUT_SUCCESS:
    case USER_LOGIN_FAILURE:
    case USER_REGISTER_FAILURE:
      window.localStorage.removeItem('token');
      return { ...state, loading: false, token: null, user: {},
        authenticated: false,
      };
    case USER_ERROR_RESET: return { ...state, error: null };
    case USER_DETAILS_RESET: return { ...state, user: {} };
    case BALANCE_TOGGLE_EDITING:
      return { ...state, editingBalance: !state.editingBalance }
    default:
      return state;
  }
};

export default userReducer;
