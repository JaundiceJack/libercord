// Import router stuff
import { Link } from 'react-router-dom';
// Import style presets
import { navLinkClasses, navIconClasses, navTextClasses } from './tailwinds';

// Set up a nav link that routes to the target with the provided text and icon
const NavLink = ({ target, text, icon, extraClasses, onClick }) => {
  return (
    <Link className={navLinkClasses+extraClasses} to={target} onClick={onClick}>
      <p className={navTextClasses}>{text}</p>
      <p className={navIconClasses}>{icon}</p>
    </Link>
  );
};

export default NavLink;
