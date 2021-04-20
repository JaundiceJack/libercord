// Import basics
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import server actions
import { login } from '../../actions/authActions';
// Import components
import TextEntry from '../inputs/textEntry';
// Import style presets
import { submitClasses,     cardContainerClasses,
         headerTextClasses, hrCenterClasses } from '../tailwinds';

const Login = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated         = useSelector( state => state.auth.isAuthenticated );

  // On form submission, attempt to log in
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    // Validate entries

    // Attempt logging in
    const currentUser = {
      email:    email,
      password: password
    };
    dispatch(login(currentUser));
  }

  return (
    <section className="mt-6 flex flex-col items-center mb-6">
      <form className={cardContainerClasses + "w-full sm:w-1/2"} onSubmit={onSubmit}>
        <div className="rounded-t-lg p-2 shadow-2xl">
          <h2 className={headerTextClasses+"text-center"}>
            Login
          </h2>
        </div>
        <div className={hrCenterClasses}></div>
        <div className="p-4 grid gap-2">
          <TextEntry id="email"
                     text="Email"
                     type="email"
                     onChange={e => setEmail(e.target.value)} />
          <TextEntry id="password"
                     text="Password"
                     type="password"
                     onChange={e => setPassword(e.target.value)} />
          <button className={submitClasses+"mt-4"} type="submit">
            <p className="">Login</p>
          </button>
        </div>
      </form>
      {isAuthenticated && <Redirect to="/manage" />}
    </section>
  );

};

// Set prop types and export
Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  error:           PropTypes.object.isRequired,
  changePage:      PropTypes.func,
  login:           PropTypes.func.isRequired
}
export default Login;
