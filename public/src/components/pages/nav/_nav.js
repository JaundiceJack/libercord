// Import basics
import { useSelector } from 'react-redux';
// Import router stuff
//import { useLocation } from 'react-router-dom';
// Import Components
import Logo from './logo.js';
import Links from './links.js';
//import Profile from './profile.js';
import Logout from './logout.js';

const Nav = () => {
  const { user } = useSelector(state => state.user);
  //const location  = useLocation();

  return (
    <nav className={"self-stretch flex sm:flex-col flex-row z-50 items-center justify-center sm:justify-start "}>
      <div className="sticky top-2 flex sm:flex-col flex-row p-2 items-center">

        <Logo />

        {user && user.token && <Links /> }
      </div>

      {/* <div className="h-full" /> */}

      {/* <Profile /> */}

      {user && user.token && <Logout />}

    </nav>
  )
}

export default Nav;
