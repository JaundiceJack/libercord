import Nav from './components/nav.js';
import Manage from './components/manage/manage.js';
import Money from './components/edu/money.js';
import Footer from './components/footer.js';
import {Provider} from 'react-redux';
import store from './store.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <div className="py-0 sm:py-12 bg-gray-800 min-h-screen">
            <main className="md:w-5/6 sm:w-full h-full flex flex-col md:flex-row rounded mx-auto bg-gradient-to-br from-black via-black to-gray-900" style={{"border-top-left-radius": "40px"}}>
              <Nav />
              <div className="p-2 flex flex-col w-full">
                <Switch>
                  <Route exact path="/" component={Manage} />
                  <Route exact path="/money" component={Money} />
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

export default App;
