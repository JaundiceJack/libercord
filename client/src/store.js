// This file creates a redux store
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.navigator.userAgent.includes('Chrome') || window.navigator.userAgent.includes('Safari') ?
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() :
      compose,
    ),
  );


//const store = createStore(rootReducer, initialState,
//  compose(
//    applyMiddleware(...middleware),
//    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//  ));

export default store;
