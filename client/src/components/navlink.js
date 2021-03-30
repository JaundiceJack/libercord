//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';

const linkClasses = "relative flex items-center justify-center cursor-pointer link "

const NavLink = ({target, text, icon, className}) => {
  return (
    <Link className={className ? linkClasses + className : linkClasses} to={target}>
      <p className="ref ml-2 absolute text-lg text-gray-300 no-underline hover:no-underline">{text}</p>
      <p className="icon absolute text-gray-300">{icon}</p>
    </Link>
  );
};

export default NavLink;
