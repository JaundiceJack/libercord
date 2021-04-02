// Import basic react stuff
import React, { Component } from 'react';
// Import state stuff
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Import server actions
import { logout } from '../../actions/authActions';
// Import icons
import { RiLogoutCircleLine } from 'react-icons/ri'

class Logout extends Component {
  state = {};
  // Define prop types
  static propTypes = {
    logout: PropTypes.func.isRequired
  }
  // Logout when clicked and redirect to the home page
  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render () {
    return (
      <div onClick={this.onLogout}
           className="relative flex items-center justify-center cursor-pointer link">
        <p className="ref ml-2 absolute text-lg text-gray-300 no-underline hover:no-underline">
          Logout
        </p>
        <p className="icon absolute text-gray-300">
          <RiLogoutCircleLine size="40px" />
        </p>
      </div>
    );
  }
};

export default connect(null, { logout })(Logout);
