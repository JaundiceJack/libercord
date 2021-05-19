// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import router stuff
import { Redirect }        from 'react-router-dom';
// Import components
import TextEntry           from '../inputs/textEntry';
// Import style presets
import { submitClasses,     cardContainerClasses,
         headerTextClasses, hrCenterClasses,
         errorMsgClasses } from '../tailwinds';
// Import server actions
import { clearErrors }     from '../../actions/errorActions';
import { forgotPassword }  from '../../actions/authActions';

const Forgot = () => {
  const [email,      setEmail]      = useState("");
  const [sent,       setSent]       = useState(false);
  const [badEntries, setBadEntries] = useState([]);
  // Get the authentication state and submission errors
  const errorMsg        = useSelector( state => state.error.msg.msg );

  // Clear the badEntries after the timer runs out
  const dispatch = useDispatch();
  const updateTimer = useRef(null);
  const setUpdate = () => { updateTimer.current = setTimeout(() => {
    dispatch(clearErrors());
    setBadEntries([]);
    updateTimer.current = null; }, 5000);
  }
  // Update errors from the server
  useEffect(() => { !updateTimer.current && setUpdate() }, [errorMsg]);
  // Clear the timer on unmount
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current); }; }, []);

  // On form submission, dispatch a password reset email
  const onSubmit = e => {
    e.preventDefault();
    // Validate entries
    let errs = [];
    if (email === "" || email === null)
      errs.push("Please enter a valid email address.");
    setBadEntries(errs);
    // Dispatch a password reset request
    if (errs.length === 0) { dispatch(forgotPassword(email)); setSent(true); }
    // If there were entry errors, display them for 5 seconds
    else { !updateTimer.current && setUpdate(); }
  }

  return (
    <section className="mt-6 flex items-center justify-center mb-6 h-full">
      {sent && <Redirect to="/login" />}
      <form className={cardContainerClasses + "w-full sm:w-1/2"} onSubmit={onSubmit}>
        <div className="rounded-t-lg p-2 pt-5 shadow-2xl">
          <h2 className={headerTextClasses+"text-center"}>
            Reset Password
          </h2>
        </div>
        <div className={hrCenterClasses}></div>
        <div className="p-4 grid gap-2">
          <p className="font-jose text-blue-200 ml-4 mb-2">
          Enter your email and a password reset link will be sent.</p>
          <TextEntry id="email"
                     text="Email"
                     type="email"
                     onChange={e => setEmail(e.target.value)} />
          { badEntries.map(err => <div className={errorMsgClasses}> {err} </div> )  }
          { errorMsg && <div className={errorMsgClasses}> {errorMsg} </div> }
          <button className={submitClasses+"mt-4"} type="submit">
            <p>Send</p>
          </button>
        </div>
      </form>
    </section>
  );

};

// Set prop types and export
Forgot.propTypes = {

}
export default Forgot;
