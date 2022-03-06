// Import Basics
import { Link } from 'react-router-dom';
// Import functions
import { capitalize } from '../../../functions/strings.js';

const NavLink = ({ path, label, color, icon, onClick, extraClasses }) => {
  return (
    <Link to={path} onClick={onClick}
      className={
        "relative flex flex-row items-center rounded-lg group " +
        "sm:px-3 px-2 py-2 sm:mr-0 mx-1 sm:mb-3 h-12 w-12 " + extraClasses}>
      {/* Link Button */}
      <div className={
        "absolute bottom-0 left-0 right-0 py-2 px-6 h-12 hover:h-11 w-12  " +
        "flex items-center justify-center focus:outline-none rounded-lg " +
        "transform duration-300 border-b-4 hover:border-b-0 " +
        `border-${color}-800 bg-button-${color} `}>
        <div className="text-blue-200">
          {icon}
        </div>
      </div>
      {/* Link Tooltip */}
      <div className={
        "absolute left-16 h-10 w-0 p-2 flex items-center tooltip rounded-lg " +
        "transform duration-300 opacity-0 group-hover:opacity-100 " +
        (label <= 5 ? "group-hover:w-16 " :
         label <  7 ? "group-hover:w-20 " : "group-hover:w-24 ") }>
        <p className="text-white text-shadow text-center w-full font-semibold font-jose">
          {capitalize(label)}
        </p>
      </div>
    </Link>
  )
}

export default NavLink;
