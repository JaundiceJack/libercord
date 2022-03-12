import {
  INCOME_LIST_REQUEST,   INCOME_LIST_SUCCESS,   INCOME_LIST_FAILURE,
  INCOME_GET_REQUEST,    INCOME_GET_SUCCESS,    INCOME_GET_FAILURE,
  INCOME_CREATE_REQUEST, INCOME_CREATE_SUCCESS, INCOME_CREATE_FAILURE,
  INCOME_EDIT_REQUEST,   INCOME_EDIT_SUCCESS,   INCOME_EDIT_FAILURE,
  INCOME_DELETE_REQUEST, INCOME_DELETE_SUCCESS, INCOME_DELETE_FAILURE,
  INCOME_ERROR_RESET,    INCOME_DIRECT_SELECT,
  INCOME_TOGGLE_ADDING,  INCOME_TOGGLE_EDITING, INCOME_TOGGLE_DELETING,
  INCOME_TABLE_SORT, INCOME_RESET
} from '../actions/types.js';


const initialState = {
  incomes: [],
  selected: null,
  loading: false,
  adding: false,
  editing: false,
  deleting: false,

  table: {
    sortBy: 'date',
    sortDirection: 'desc',
    selectedRow: null,
    columns: [
      { name: 'value',    text: 'Received', view: true },
      { name: 'category', text: 'Category', view: true },
      { name: 'date',     text: 'When',     view: true },
      { name: 'source',   text: 'Source',   view: false },
    ]
  }
}

const incomeReducer = (state = initialState, action) => {
  switch(action.type) {
    case INCOME_LIST_REQUEST:
    case INCOME_GET_REQUEST:
    case INCOME_CREATE_REQUEST:
    case INCOME_EDIT_REQUEST:
    case INCOME_DELETE_REQUEST:
      return { ...state, loading: true }
    case INCOME_LIST_FAILURE:
    case INCOME_GET_FAILURE:
    case INCOME_CREATE_FAILURE:
    case INCOME_EDIT_FAILURE:
    case INCOME_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case INCOME_LIST_SUCCESS:
      return { ...state, loading: false, incomes: action.payload }
    case INCOME_GET_SUCCESS:
      return { ...state, loading: false, selected: action.payload }
    case INCOME_CREATE_SUCCESS:
      return {
        ...state,
        // Add the new income to the end
        incomes: [
          ...state.incomes,
           action.payload
         ],
        selected: action.payload,
        adding: false,
        loading: false
      }
    case INCOME_EDIT_SUCCESS:
      return {
        ...state,
        // Filter out the income with the payload's id and add the edited one to the end
        incomes: [
          ...state.incomes.filter(income => income._id !== action.payload._id),
          action.payload
        ],
        selected: action.payload,
        editing: false,
        loading: false
      }
    case INCOME_DELETE_SUCCESS:
      return {
        ...state,
        // Filter out the income with the payload's id
        incomes: [
          ...state.incomes.filter(income => income._id !== action.payload)
        ],
        selected: null,
        deleting: false,
        loading: false
      }
    case INCOME_TOGGLE_ADDING: return { ...state, adding: !state.adding }
    case INCOME_TOGGLE_EDITING: return { ...state, editing: !state.editing }
    case INCOME_TOGGLE_DELETING: return { ...state, deleting: !state.deleting }
    case INCOME_DIRECT_SELECT: return { ...state, selected: action.payload }

    case INCOME_TABLE_SORT:
      return {
        ...state,
        adding: false,
        editing: false,
        deleting: false
      }
    case INCOME_ERROR_RESET: return { ...state, error: null }
    case INCOME_RESET: return initialState;
    default:
      return state;
  }
};

export default incomeReducer;
