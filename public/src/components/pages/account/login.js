// Import basics
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import server actions
import { login }      from '../../../actions/userActions.js';
import { clearError } from '../../../actions/errorActions.js';
// Import components
import Message   from '../../misc/message.js';
import Spinner   from '../../misc/spinner.js';
import TextEntry from '../../input/textEntry.js';
import Button    from '../../input/button.js';

const Login = ({ location, history }) => {
  const [entries, setEntries] = useState({
    email: "",
    password: ""
  });
  const onEntry = e => { setEntries({ ...entries, [e.target.name]: e.target.value }); };
  const [msgs, setMsgs] = useState([]);

  // Get the authentication state and submission errors
  const { error, loading, user } = useSelector( state => state.user );

  // Grab any redirect from the history
  const redirect = location.search ? location.search.split('=')[1] : "/summary";

  // Clear the msgs after the timer runs out
  const dispatch = useDispatch();
  const timer = useRef(null);
  const clearErrors = () => {
    timer.current = setTimeout(() => {
    timer.current = null;
    dispatch(clearError('user'));
    setMsgs([]); }, 5000);
  }
  // Update errors from the server / clear out errors after 5 seconds
  useEffect(() => {
    if (user.token) { history.push(redirect); }
    else if (!timer.current) { clearErrors(); }
  }, [error, dispatch, history, user, redirect]);
  // Clear the timer on unmount
  useEffect(() => {return() => {timer.current&&clearTimeout(timer.current)}},[]);

  // On form submission, attempt to log in
  const onSubmit = e => {
    e.preventDefault();
    // Validate entries
    let errs = [];
    if (entries.email === "" || entries.email === null)
      errs.push("Please enter a valid emal address.");
    if (entries.password === "" || entries.password === null)
      errs.push("Please enter a password.");
    if (entries.password.length > 0 && entries.password.length < 8)
      errs.push("Passwords must be at least 8 characters in length.");
    setMsgs(errs);

    // Attempt logging in
    if (errs.length === 0) { dispatch(login(entries)); }
    // If there were entry errors, display them for 5 seconds
    else { !timer.current && clearErrors(); }
  }

  return (
    <main className="flex items-center h-full w-full">
      <form className={"flex flex-col sm:items-start items-center mx-auto my-28 " +
        "container-bg p-4 rounded-xl"}
            onSubmit={onSubmit}>
        { loading ? <Spinner /> :
          <div className="flex flex-col">
            <h1 className={"sm:mr-2 mb-2 font-mont font-bold text-transparent bg-clip-text " +
              "bg-gradient-to-b from-yellow-400 to-white text-xl"}>
              Login: </h1>
            <TextEntry name="email" type="email" label="Email:" placeholder="Email" labelColor="text-yellow-400"
                   onChange={onEntry} />
            <TextEntry name="password" type="password" label="Password:" placeholder="Password" labelColor="text-yellow-400"
                   onChange={onEntry} extraClasses="mb-4" />
            <Button type="submit" label="Login" color="green" extraClasses="mx-auto"/>
            { msgs.map(err => <Message error={err} /> )  }
            { error && <Message error={error} /> }
          </div>
        }
      </form>
    </main>
  )
}

export default Login;
