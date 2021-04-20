// Import basics
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect } from 'react-router-dom';
// Import server actions
import { register } from '../../actions/authActions';
// Import components
import TextEntry from '../inputs/textEntry';
// Import style presets
import {
  submitClasses,
  cardContainerClasses,
  headerTextClasses,
  hrCenterClasses } from '../tailwinds';


const CreateAccount = () => {
  // Initialize the component's state for each form field
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [typos, setTypos]       = useState([]);
  // Get the authentication state and submission errors
  const isAuthenticated = useSelector( state => state.auth.isAuthenticated );
  const error           = useSelector( state => state.error );

  // On form submission, attempt to create a new user
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    // Validate entries


    // Register the new user
    const newUser = {
      name:     name,
      email:    email,
      password: password
    };
    dispatch(register(newUser));
  }

  return (
    <section className="mt-6 flex flex-col items-center mb-6">
      <form className={cardContainerClasses + "w-full sm:w-1/2"} onSubmit={onSubmit}>
        <div className="rounded-t-lg p-2 shadow-2xl">
          <h2 className={headerTextClasses+"text-center"}>
            Create an Account
          </h2>
        </div>
        <div className={hrCenterClasses}></div>
        <div className="p-4 grid gap-2">
          <TextEntry id="name"     text="Username"
                     onChange={e => setName(e.target.value)} />
          <TextEntry id="email"    text="Email"
                     onChange={e => setEmail(e.target.value)} type="email" />
          <TextEntry id="password" text="Password"
                     onChange={e => setPassword(e.target.value)} type="password" />
          <TextEntry id="confirm"  text="Confirm Password"
                     onChange={e => setConfirm(e.target.value)} type="password" />
          <button className={submitClasses+"mt-4"} type="submit">
            <p className="">Create</p>
          </button>
        </div>
      </form>
      {isAuthenticated && <Redirect to="/manage" />}
    </section>
  );
};

// Set prop types and export
CreateAccount.propTypes = {
  isAuthenticated: PropTypes.bool,
  error:           PropTypes.object.isRequired,
  register:        PropTypes.func.isRequired
}
export default CreateAccount;
