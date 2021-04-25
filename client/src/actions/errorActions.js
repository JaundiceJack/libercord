// Import action types
import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Put any action errors into the current state
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  }
}

// Remove any errors from the current state
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
