import Nav from './components/nav';
import Manage from './components/manage/manage';
import Money from './components/edu/money';
import Login from './components/account/login';
import CreateAccount from './components/account/create';
import Footer from './components/footer';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React, { Component } from 'react';
import { loadUser } from './actions/authActions';

class App extends Component {
  // TODO: move this to manage so it's not checking on the homepage
  // Load the user when the app loads
  componentDidMount() { store.dispatch(loadUser()); }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div className="py-0 sm:py-12 bg-gray-800 min-h-screen">
              <main className="md:w-5/6 sm:w-full h-full flex flex-col md:flex-row rounded mx-auto bg-gradient-to-br from-black via-black to-gray-900" style={{"border-top-left-radius": "40px"}}>
                <Nav />
                <div className="p-2 flex flex-col w-full">
                  <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/create" component={CreateAccount} />
                    <Route exact path="/manage" component={Manage} />
                    <Route exact path="/" component={Money} />
                  </Switch>
                  <Footer />
                </div>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
