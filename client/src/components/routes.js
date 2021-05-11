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
  useEffect(() => {
    console.log("routes loaded");
    /*
    if (history.location.pathname.startsWith('/reset:')) {
      // Dispatch a token verification request to the server
      const token = history.location.pathname.substr(7);
      dispatch(checkResetToken(token));

      // So, on the reset page, I should check if the token is currently being verified first,
      // if it's not, check if the isGenuine is true
      // if isGenuine is true, render the reset page, otherwise redirect to the login with errors
      // if it is being verified, load a blank page until done verifying

      // Send the user to the reset password page
      history.push('/reset');

    }


    ok, now i have the routes fixed a bit, and the idea a bit more clear,
    instead of complicated routing stuff on the new password page,
    instead i'll simply do the token verification before changing the password,
    that way i can respond with an error on the page
    (and possibly redirect to the forgot page to prompt a new email submission)
    */
  }, []);

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
