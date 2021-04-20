// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import nav icons
import { FaBalanceScale, FaFileContract, FaHome } from 'react-icons/fa';
import { RiLoginCircleLine, RiAccountPinCircleLine } from 'react-icons/ri';
// Import components
import NavLink        from './navlink';
import Logo           from './logo';
import Logout         from './account/logout'
// Import style presets
import { navClasses } from './tailwinds';
// Import actions
import { changePage } from '../actions/authActions';

// So, to get the left indicators to highlight like the manage ones,
// i need to make a state boolean and check the current page against it

const Nav = () => {
  // Check for user authentication each 1000ms
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const updateTimer = useRef(null);
  const setUpdate = () => {
    updateTimer.current = setTimeout(() => { updateTimer.current = null }, 1000);
  }
  useEffect(() => {
    !updateTimer.current && setUpdate() }, [isAuthenticated]);
  useEffect(() => { return () => {
    updateTimer.current && clearTimeout(updateTimer.current) } }, []);

  // Get the active page to highlight
  const page = useSelector(state => state.auth.currentPage);

  // Change the highlighted page icon
  const dispatch = useDispatch();
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }

  return (
    <nav className={navClasses}>
      <Logo onClick={() => changeActive('home')}/>

      {/*If not logged in, show the account creation and login buttons*/}
      {!isAuthenticated &&
        <NavLink target="/login" text="Login"
          icon=<RiLoginCircleLine size="40px" />
          extraClasses={page === 'login' && "border-green-600"}
          onClick={() => changeActive('login')}/>}
      {!isAuthenticated &&
        <NavLink  target="/create" text="Sign Up"
          icon=<RiAccountPinCircleLine size="40px" />
          extraClasses={page === 'create' && "border-green-600"}
          onClick={() => changeActive('create')} />}

      {/* If logged in, show the app and logout buttons*/}
      {isAuthenticated &&
        <Logout />}
      {isAuthenticated &&
        <NavLink target="/manage" text="Manage"
          icon=<FaBalanceScale size="40px" />
          extraClasses={page === 'manage' && "border-green-600"}
          onClick={() => changeActive('manage')} />}
        <div className="flex-grow"></div>
        <NavLink target="/employ" text="Employ"
          icon=<FaFileContract size="40px" />
          extraClasses={page === 'employ' && "border-green-600"}
          onClick={() => changeActive('employ')} />
    </nav>
  );
};

// Set prop types and export
Nav.propTypes = {
  isAuthenticated: PropTypes.bool
}
export default Nav;
