// Import router stuff
import { Route, Switch } from 'react-router-dom';
// Import Page Components
import Home          from './pages/home/_home.js';
import Employ        from './pages/employment/_employ.js';
import Login         from './pages/account/login.js';
import Summary       from './pages/manage/summaries/_summary.js';
import Expense       from './pages/manage/expenses/_expense.js';
import Income        from './pages/manage/income/_income.js';
import Asset         from './pages/manage/assets/_asset.js';
import Liability     from './pages/manage/liabilities/_liability.js';
//import Forgot      from './pages/account/forgot.js';
//import Reset       from './pages/account/reset.js';
import CreateAccount from './pages/account/create.js';

const Routes = () => {

  /*
  <Route exact path="/forgot" component={Forgot} />
  <Route path="/reset/:token" component={Reset} />
  */

  return (
    <Switch>
      <Route exact path="/"            component={Home} />
      <Route exact path="/login"       component={Login} />
      <Route exact path="/create"      component={CreateAccount} />
      <Route exact path="/summary"     component={Summary} />
      <Route exact path="/income"      component={Income} />
      <Route exact path="/expenses"    component={Expense} />
      <Route exact path="/assets"      component={Asset} />
      <Route exact path="/debts"       component={Liability} />
      <Route exact path="/employ"      component={Employ} />
    </Switch>
  )
}

export default Routes;
