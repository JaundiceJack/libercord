// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import store from './store';
import {Provider} from 'react-redux';
// Import routing stuff
import { BrowserRouter } from 'react-router-dom';
// Import components
import Nav    from './components/nav';
import Routes from './components/routes';

class App extends Component {
  render() {
    return (
      // Get the state from the store and provide it to the rest of the app
      <Provider store={store}>
        {/*Connect nav links to their routes via Browser Router*/}
        <BrowserRouter>
          <div className="bg-gray-800 min-h-screen flex">
            <main className="flex-1 flex flex-col md:flex-row \
                             rounded bg-gradient-to-br from-black via-black to-gray-900 ">
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
