// Import basics
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import icons
import { RiLogoutCircleLine } from 'react-icons/ri';
// Import server actions
import { logout } from '../../actions/authActions';
// Import style presets
import { navLinkClasses, navIconClasses, navTextClasses } from '../tailwinds';

const Logout = () => {
  // Dispatch the logout action if the button is clicked
  const dispatch = useDispatch();
  const onLogout = () => { dispatch(logout()); }

  return (
    <div onClick={onLogout} className={navLinkClasses}>
      <p className={navTextClasses}>
        Logout
      </p>
      <p className={navIconClasses}>
        <RiLogoutCircleLine size="40px" />
      </p>
    </div>
  );
};

// Set proptypes and export
Logout.propTypes = {
  logout: PropTypes.func.isRequired
}
export default Logout;
