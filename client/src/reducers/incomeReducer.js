import {
  GET_INCOMES,
  ADD_INCOME,
  SELECT_INCOME,
  EDIT_INCOME,
  DELETE_INCOME,
  LOADING_INCOMES,
  UPDATE_INCOME_COL,
  SORT_INCOME,
} from '../actions/types.js';

const initialState = {
  incomes: [],
  selectedIncome: null,
  selectedRow: null,
  categories: ["Job", "Stimulus", "Lucky Find", "Windfall"],
  columns: [
    {name: 'value',    text: 'Received',     view: true},
    {name: 'category', text: 'Category', view: true},
    {name: 'date',     text: 'When',     view: true},
    {name: 'source', text: 'Source', view: false},
  ],
  loading: false
}

const incomeReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INCOMES:
      return {
        ...state,
        incomes: action.payload,
        loading: false
      }
    case DELETE_INCOME:
      return {
        ...state,
        incomes: state.incomes.filter(income => income._id !== action.payload),
        selectedIncome: null,
        selectedRow: null
      }
    case ADD_INCOME:
      return {
        ...state,
        incomes: [...state.incomes, action.payload],
        selectedIncome: null,
        selectedRow: null
      }
    case LOADING_INCOMES:
      return {
        ...state,
        loading: true
      }
      case UPDATE_INCOME_COL:
        return {
          ...state,
          columns: state.columns.map(col =>
            col.name === action.payload.name ? action.payload : col)
        }
      case SELECT_INCOME:
        return {
          ...state,
          selectedIncome: action.payload.income,
          selectedRow:    action.payload.index
        }
      case EDIT_INCOME:
        return {
          ...state,
          incomes: [...state.incomes.filter(income =>
            {return income._id !== action.payload._id}), action.payload],
          selectedIncome: null,
          selectedRow: null,
        }
      case SORT_INCOME:
        return {
          ...state,
          selectedRow: null
        }
    default:
      return state;
  }
};

export default incomeReducer;
