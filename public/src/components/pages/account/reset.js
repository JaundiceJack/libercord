// Import basics
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Import server actions
import { updatePassword, clearResetError, clearUserError, clearResetMessage }
  from '../../../actions/userActions.js';
// Import components
import Message   from '../../misc/message.js';
import Spinner   from '../../misc/spinner.js';
import TextEntry from '../../input/textEntry.js';
import Button    from '../../input/button.js';

const Forgot = ({ match, location, history }) => {
  // Get the parameters from the link
  const userId = match.params.id;
  const token  = match.params.token;

  // Set input error messages
  const [msgs, setMsgs] = useState([]);
  // Initialize the component's state for each form field
  const [entries, setEntries] = useState({
    password: "",
    confirm: "",
    id: userId,
    token: token
  })
  const onEntry = e => { setEntries({...entries, [e.target.name]: e.target.value }); };

  //console.log(entries)

  // Get the authentication state and submission errors
  const { user, error: userError } = useSelector(state => state.user);
  const { loading, error: resetError, message } = useSelector(state => state.reset);

  // Grab any redirect from the history
  const redirect = location.search ? location.search.split('=')[1] : "/summary";

  // Clear the msgs after the timer runs out
  const dispatch = useDispatch();
  const timer = useRef(null);
  // Update errors from the server
  useEffect(() => {
    // If the user is logged in, redirect to the summary page
    if (user && user.token) { history.push(redirect) }
    // Clear account creation errors after 5 seconds
    if (!timer.current) {
      timer.current = setTimeout(() => {
        dispatch(clearResetError());
        dispatch(clearUserError());
        dispatch(clearResetMessage());
        timer.current = null;
      }, [5000]);
    }
    return () => timer.current && clearTimeout(timer.current);
  }, [dispatch, user, resetError, userError, history, redirect]);

  // Check for input errors
  const validateEntries = () => {
    let errs = [];
    if (!entries.password)
      errs.push("Please enter a new password.");
    else if (entries.password.length < 8)
      errs.push("Passwords must be at least 8 characters in length.");
    if (entries.password !== entries.confirm)
      errs.push("Password and password confirmation do not match.");
    setMsgs(errs);
    return errs;
  }

  // On form submission, attempt to create a new user
  const onSubmit = e => {
    e.preventDefault();
    validateEntries().length === 0 ?
      dispatch(updatePassword(userId, token, entries.password)) :
      setTimeout(() => setMsgs([]), 5000)
  }

  return (
    <main className="flex items-center h-full w-full">
      <form onSubmit={onSubmit} className={`flex flex-col my-28 mx-auto p-4
        sm:items-start items-center container-bg rounded-xl`} >
        {loading ? <Spinner /> :
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between mb-4">
              <h1 className={`sm:mr-2 font-jose font-bold text-transparent
                bg-clip-text bg-gradient-to-b from-yellow-400 to-white text-xl`}>
                Enter a new password:
              </h1>
            </div>

            <TextEntry type="password" name="password" value={entries.password}
              label="Password:" placeholder="Password"
              labelColor="text-yellow-400" onChange={onEntry} />
            <TextEntry type="password" name="confirm" value={entries.confirm}
              label="Confirm:" placeholder="Confirm Password"
              labelColor="text-yellow-400" onChange={onEntry}
              extraClasses="mb-6"/>

            <Button type="submit" label="Confirm"
              extraClasses="mx-auto" color="green" />

            { msgs.map(err => <Message warning={err} /> )  }
            { resetError && <Message error={resetError} /> }
            { userError && <Message error={userError} /> }
            { message && <Message success={message} /> }
          </div>
        }
      </form>
    </main>
  )
}

export default Forgot;
