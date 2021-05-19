// Import router stuff
import { Link } from 'react-router-dom';
// Import the logo image
import logo from '../images/lclogo.png'

const Logo = ({ onClick }) => {
  const logoClasses = "h-10 w-10 md:h-14 md:w-14 md:mt-4 ml-4 mb-4 mt-3 mr-4 md:mr-0" +
                      " transform duration-75 hover:scale-110 "

  return (
    <Link to="/" className={logoClasses} onClick={onClick}>
      <img src={logo} className="rounded-full" alt="LiberCrypt Logo" />
    </Link>
  );
};

export default Logo;

/*
.logo {
  width: 70px;
  height: 70px;
  margin: 5px;
}
.logo img {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;
}
*/
