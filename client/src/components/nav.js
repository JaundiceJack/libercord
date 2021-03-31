import { FaBalanceScale, FaSpinner, FaFileContract, FaBitcoin } from 'react-icons/fa';
import { RiLoginCircleLine } from 'react-icons/ri';
import NavLink from './navlink.js';
import Logo from './logo.js';
import React, { Component } from 'react';

class Nav extends Component {

  render() {
    return (
      <nav className="flex-grow flex flex-row md:flex-col bg-black rounded-bl" style={{"border-top-left-radius": "40px"}}>
        <Logo />
        <NavLink className="" target="/" text="Crypto" icon=<FaBitcoin size="40px" /> />
        <NavLink className="active" target="/create" text="Sign Up" icon=<RiLoginCircleLine size="40px" /> />
        <NavLink className="" target="/login" text="Login" icon=<RiLoginCircleLine size="40px" /> />
        <NavLink className="" target="/manage" text="Manage" icon=<FaBalanceScale size="40px" /> />
        <div className="flex-grow"></div>

      </nav>
    );
  }
};

// test

/*<NavLink target="/employ" text="Employ" icon=<FaFileContract size="40px" /> />
<NavLink target="/hub" text="Hub" icon=<FaSpinner size="40px" /> />*/

export default Nav;
