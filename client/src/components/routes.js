// Import router stuff
import { Route, Switch } from 'react-router-dom';
// Import Components
import Footer from './footer';
import Manage from './manage/manage';
import Home from './pages/home';
import Employ from './pages/employ';
import Login from './account/login';
import CreateAccount from './account/create';

const Routes = () => {
  return (
    <div className="p-2 flex flex-col w-full">
      <Switch>
        <Route exact path="/"       component={Home} />
        <Route exact path="/login"  component={Login} />
        <Route exact path="/create" component={CreateAccount} />
        <Route exact path="/manage" component={Manage} />
        <Route exact path="/employ" component={Employ} />
      </Switch>
      <Footer />
    </div>
  )
}

export default Routes;
