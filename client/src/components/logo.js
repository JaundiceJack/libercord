// Import router stuff
import { Link } from 'react-router-dom';
// Import the logo image
import logo from '../images/lclogo.png'

const Logo = ({ onClick }) => {
  const logoClasses = "h-16 w-16 mt-1 sm:mt-4 ml-1 sm:ml-0 mb-6 self-start sm:self-center " +
                      "transform duration-75 hover:scale-110 "

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
