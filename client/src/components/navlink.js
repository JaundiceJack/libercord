// Import router stuff
import { Link } from 'react-router-dom';
// Import style presets
import { navLinkClasses } from './tailwinds';

// Set up a nav link that routes to the target with the provided text and icon
const NavLink = ({target, text, icon}) => {
  return (
    <Link className={navLinkClasses} to={target}>
      <p className="ref ml-2 absolute text-lg text-gray-300 no-underline hover:no-underline">{text}</p>
      <p className="icon absolute text-gray-300">{icon}</p>
    </Link>
  );
};

export default NavLink;
