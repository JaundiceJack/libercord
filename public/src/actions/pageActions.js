import { SET_PAGE, SET_SECTION } from './types';

export const setPage = nextPage => dispatch => { dispatch({ type: SET_PAGE, payload: nextPage })};
export const setSection = nextSection => dispatch => { dispatch({ type: SET_SECTION, payload: nextSection })};
