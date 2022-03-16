// Import basics
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Import server actions
import { login, clearUserError } from '../../../actions/userActions.js';
// Import components
import Message   from '../../misc/message.js';
import Spinner   from '../../misc/spinner.js';
import TextEntry from '../../input/textEntry.js';
import Button    from '../../input/button.js';

const Login = ({ location, history }) => {
  // Set input error messages
  const [msgs, setMsgs] = useState([]);
    // Initialize the component's state for each form field
  const [entries, setEntries] = useState({
    email: "",
    password: ""
  });
  const onEntry = e => { setEntries({ ...entries, [e.target.name]: e.target.value }); };

  // Get the authentication state and submission errors
  const { user, loading, error } = useSelector( state => state.user );

  // Grab any redirect from the history
  const redirect = location.search ? location.search.split('=')[1] : "/summary";

  // Clear the msgs after the timer runs out
  const dispatch = useDispatch();
  const timer = useRef(null);
  // Update errors from the server / clear out errors after 5 seconds
  useEffect(() => {
    // If the user is logged in, redirect to the summary page
    if (user.token) { history.push(redirect); }
    // Clear account login errors after 5 seconds
    if (!timer.current) {
      timer.current = setTimeout(() => {
        dispatch(clearUserError());
        timer.current = null;
      }, [5000]);
    }
  }, [dispatch, user, error, history, redirect]);
  // Clear the timer on unmount
  useEffect(() => {return() => {timer.current&&clearTimeout(timer.current)}},[]);

  // Check for input errors
  const validateEntries = () => {
    let errs = [];
    if (entries.email === "" || entries.email === null)
      errs.push("Please enter a valid emal address.");
    if (entries.password === "" || entries.password === null)
      errs.push("Please enter a password.");
    if (entries.password.length > 0 && entries.password.length < 8)
      errs.push("Passwords must be at least 8 characters in length.");
    setMsgs(errs);
    return errs;
  }

  // On form submission, attempt to log in
  const onSubmit = e => {
    e.preventDefault();
    validateEntries().length === 0 ?
      dispatch(login(entries)) :
      setTimeout(() => setMsgs([]), 5000)
  }

  return (
    <main className="flex items-center h-full w-full">
      <form onSubmit={onSubmit} className={`flex flex-col mx-auto my-28 p-4
        sm:items-start items-center container-bg rounded-xl`}>
        { loading ? <Spinner /> :
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between mb-4">
              <h1 className={`sm:mr-2 font-jose font-bold text-transparent
                bg-clip-text bg-gradient-to-b from-yellow-400 to-white text-xl`}>
                Login:
              </h1>
              <div className="flex flex-col items-end">
                <Link to="/create" title="Create a new account."
                  className={`font-jose text-sm text-yellow-400`}>
                  Need an account?
                </Link>
                <Link to="/forgot" title="Reset your password."
                  className={`font-jose text-sm text-yellow-400`}>
                  Forgot password?
                </Link>
              </div>
            </div>


            <TextEntry name="email" type="email" value={entries.email}
              label="Email:" placeholder="Email"
              labelColor="text-yellow-400" onChange={onEntry} />
            <TextEntry name="password" type="password" value={entries.password}
              label="Password:" placeholder="Password"
              labelColor="text-yellow-400" onChange={onEntry}
              extraClasses="mb-6" />

            <Button type="submit" label="Login"
              color="green" extraClasses="mx-auto"/>
            { msgs.map(err => <Message error={err} /> )  }
            { error && <Message error={error} /> }
          </div>
        }
      </form>
    </main>
  )
}

export default Login;
