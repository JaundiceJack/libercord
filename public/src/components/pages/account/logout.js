// Import basics
import { useDispatch } from 'react-redux';
// Import router stuff
import { Link } from 'react-router-dom';
// Import icons
import { RiLogoutCircleLine } from 'react-icons/ri';
// Import server actions
import { logout } from '../../../actions/userActions.js';
import { setPage } from '../../../actions/pageActions.js';

const Logout = () => {
  // Dispatch the logout action if the button is clicked
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(setPage('login'));
    dispatch(logout());
  }

  const navLinkClasses =
    " relative flex group items-center justify-center self-center " +
    " h-16 cursor-pointer w-full ";
  const navIconClasses =
    " absolute opacity-1 group-hover:opacity-0 text-red-500 " +
    " transition duration-300 ease-in-out ";
  const navTextClasses =
    " absolute opacity-0 group-hover:opacity-100 ml-0 sm:ml-2 font-semibold " +
    " text-red-500 text-shadow text-lg no-underline hover:no-underline " +
    " transition duration-300 ease-in-out ";

  return (
    <Link to='/login' onClick={onLogout} className={navLinkClasses}>
      <p className={navTextClasses}>
        Logout
      </p>
      <p className={navIconClasses}>
        <RiLogoutCircleLine size="40px" />
      </p>
    </Link>
  );
};

export default Logout;
