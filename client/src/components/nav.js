// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import nav icons
import { FaBalanceScale, FaFileContract, FaHome } from 'react-icons/fa';
import { RiLoginCircleLine, RiAccountPinCircleLine } from 'react-icons/ri';
// Import components
import NavLink from './navlink';
import Logout from './account/logout'
import Logo from './logo';

class Nav extends Component {
  // Define proptypes taken from the state
  static propTypes = { isAuthenticated: PropTypes.bool };
  render() {
    return (
      <nav className="flex flex-row md:flex-col bg-black rounded-bl sticky top-0 sm:h-screen z-50 rounded-b-lg sm:rounded-none">
        <Logo />
        {/*If not logged in, show the account creation and login buttons*/}
        {!this.props.isAuthenticated &&
          <NavLink target="/login" text="Login" icon=<RiLoginCircleLine size="40px" /> />}
        {!this.props.isAuthenticated &&
          <NavLink  target="/create" text="Sign Up" icon=<RiAccountPinCircleLine size="40px" /> />}
        {/* If logged in, show the app and logout buttons*/}
        {this.props.isAuthenticated &&
          <Logout />}
        {this.props.isAuthenticated &&
          <NavLink target="/manage" text="Manage" icon=<FaBalanceScale size="40px" /> />}
        <div className="flex-grow"></div>
        <NavLink target="/employ" text="Employ" icon=<FaFileContract size="40px" /> />
      </nav>
    );
  }
};

// Map the redux state to the component properties
const mapStateToProps = (state) =>
  ({ isAuthenticated: state.auth.isAuthenticated });

export default connect(mapStateToProps)(Nav);
