// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Route, Switch, useHistory } from 'react-router-dom';
// Import Components
import Footer        from './footer';
import Manage        from './manage/manage';
import Home          from './pages/home';
import Employ        from './pages/employ';
import Login         from './account/login';
import Forgot        from './account/forgot';
import Reset         from './account/reset';
import CreateAccount from './account/create';

const Routes = () => {
  // Handle the reset password route
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="p-2 flex flex-col w-full">
      <Switch>
        <Route exact path="/"       component={Home} />
        <Route exact path="/login"  component={Login} />
        <Route exact path="/forgot" component={Forgot} />
        <Route path="/reset/:token" component={Reset} />
        <Route exact path="/create" component={CreateAccount} />
        <Route exact path="/manage" component={Manage} />
        <Route exact path="/employ" component={Employ} />
      </Switch>
      <Footer />
    </div>
  )
}

export default Routes;
