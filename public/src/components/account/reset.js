// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect, useHistory, useParams } from 'react-router-dom';
// Import server actions
import { clearErrors }   from '../../actions/errorActions';
import { changePage, changePassword } from '../../actions/authActions';
// Import components
import TextEntry from '../inputs/textEntry';
// Import style presets
import { submitClasses,     cardContainerClasses,
         headerTextClasses, hrCenterClasses, errorMsgClasses } from '../tailwinds';

const Reset = () => {
  // Set component internal state variables
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [badEntries, setBadEntries] = useState([]);

  // Get the authentication state and submission errors
  const errorMsg  = useSelector( state => state.error.msg.msg );
  const isAuthenticated = useSelector( state => state.auth.isAuthenticated );

  // Get the token from the history parameter
  const history = useHistory();
  const token = useParams().token;

  // Clear the badEntries after the timer runs out
  const dispatch = useDispatch();
  const updateTimer = useRef(null);
  const setUpdate = () => { updateTimer.current = setTimeout(() => {
    dispatch(clearErrors());
    setBadEntries([]);
    updateTimer.current = null; }, 5000);
  }
  // Update errors from the server
  useEffect(() => { !updateTimer.current && setUpdate() }, [errorMsg, isAuthenticated]);
  // Clear the timer on unmount
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current); }; }, []);

  // On form submission, try to change the user's password
  const onSubmit = e => {
    e.preventDefault();
    console.log(token);
    // Validate entries
    let errs = [];
    if (password === "" || password === null)
      errs.push("Please enter a new password.");
    if (password.length > 0 && password.length < 8)
      errs.push("Passwords must be at least 8 characters in length.");
    if (password !== confirm)
      errs.push("New password and password confirmation do not match.");
    setBadEntries(errs);
    if (errs.length === 0) { dispatch(changePassword(password, token)); }
    // If there were entry errors, display them for 5 seconds
    else { !updateTimer.current && setUpdate(); }
  }

  return (
    <section className="mt-6 flex items-center justify-center mb-6 h-full">
      {isAuthenticated && <Redirect to="/manage" />}
      <form className={cardContainerClasses + "w-full sm:w-1/2"} onSubmit={onSubmit}>
        <div className="rounded-t-lg p-2 pt-5 shadow-2xl">
          <h2 className={headerTextClasses+"text-center"}>
            Reset Password
          </h2>
        </div>
        <div className={hrCenterClasses}></div>
        <div className="p-4 grid gap-2">
          <p className="font-jose text-blue-200 ml-4 mb-2">
          Enter a new password.</p>
          <TextEntry id="password"
                     text="New Password"
                     type="password"
                     onChange={e => setPassword(e.target.value)} />
         <TextEntry id="confirm"
                    text="Confirm Password"
                    type="password"
                    onChange={e => setConfirm(e.target.value)} />
          { badEntries.map(err => <div className={errorMsgClasses}> {err} </div> )  }
          { errorMsg && <div className={errorMsgClasses}> {errorMsg} </div> }
          <button className={submitClasses+"mt-4"} type="submit">
            <p>Set New Password</p>
          </button>
        </div>
      </form>
    </section>
  );

};

// Set prop types and export
Reset.propTypes = {

}
export default Reset;
