// Import router stuff
import { Link } from 'react-router-dom';
// Import the logo image
import logo from '../../../images/logoMin.png';

const Logo = () => {
  return (
    <Link to={`/home`}
      className={"relative flex flex-row items-center justify-center " +
      "sm:px-3 px-2 py-2 sm:mr-0 mx-1 sm:mb-3 rounded-lg group h-12 w-12"}>
      {/* Link Button */}
      <div className={"absolute bottom-0 left-0 right-0 py-2 px-6 " +
        "font-mont font-semibold text-green-400 focus:outline-none " +
        "rounded-lg flex items-center justify-center transform " +
        "duration-300 border-b-4 hover:border-b-0 h-12 hover:h-11 w-12 " +
        "border-yellow-800 bg-button-yellow "}>

        <img src={logo} alt="" className="absolute h-8 w-8 "/>


      </div>
      {/* Link Tooltip */}
      <div className={
        "absolute transform duration-300 opacity-0 group-hover:opacity-100 tooltip " +
        "left-16 h-10 w-0 rounded-lg flex items-center p-2 w-16 " }>
        <p className="text-white text-shadow text-center w-full font-semibold font-jose">
          Home
        </p>
      </div>
    </Link>
  )
}

export default Logo;
