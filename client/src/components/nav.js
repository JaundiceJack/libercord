import { FaBalanceScale, FaSpinner, FaFileContract, FaBitcoin } from 'react-icons/fa';
import NavLink from './navlink.js';
import Logo from './logo.js';

const Nav = () => {
  return (
    <nav className="flex-grow flex flex-row md:flex-col bg-black rounded-bl" style={{"border-top-left-radius": "40px"}}>
      <Logo />
      <NavLink className="active" target="/" text="Manage" icon=<FaBalanceScale size="40px" /> />
      <NavLink className="" target="/money" text="Crypto" icon=<FaBitcoin size="40px" /> />
      <div className="flex-grow"></div>

    </nav>
  );
};

/*<NavLink target="/employ" text="Employ" icon=<FaFileContract size="40px" /> />
<NavLink target="/hub" text="Hub" icon=<FaSpinner size="40px" /> />*/

export default Nav;
