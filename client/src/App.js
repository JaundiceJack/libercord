// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import store from './store';
import {Provider} from 'react-redux';
// Import routing stuff
import { BrowserRouter } from 'react-router-dom';
// Import server actions
import { loadUser } from './actions/authActions';
// Import components
import Nav    from './components/nav';
import Routes from './components/routes';

class App extends Component {
  // Load the user when the app loads
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      // Get the state from the store and provide it to the rest of the app
      <Provider store={store}>
        {/*Connect nav links to their routes via Browser Router*/}
        <BrowserRouter>
          <div className="py-0 sm:py-12 bg-gray-800 min-h-screen">
            <main className="md:w-5/6 sm:w-full h-full flex flex-col md:flex-row rounded mx-auto bg-gradient-to-br from-black via-black to-gray-900" style={{"border-top-left-radius": "40px"}}>
              <Nav />
              <Routes />
            </main>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
