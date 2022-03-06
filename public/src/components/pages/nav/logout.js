// Import basics
import { useDispatch } from 'react-redux';
// Import Components
import NavLink from './link.js';
// Import dispatch actions
import { logout } from '../../../actions/userActions.js';
import { setPage } from '../../../actions/pageActions.js';
// Import Icons
import { RiLogoutCircleLine } from 'react-icons/ri';

const Logout = () => {
  const dispatch = useDispatch();
  // Dispatch the logout action if the button is clicked
  const onLogout = () => {
    dispatch(setPage('login'));
    dispatch(logout());
  }

  return (
    <div className="sm:mt-auto flex sm:flex-col flex-row">
      <NavLink path={'/login'}
        onClick={onLogout}
        icon={<RiLogoutCircleLine size="30" color="rgb(39, 39, 42)" />}
        label="Logout"
        color="red" />
      </div>
  )
}

export default Logout;
