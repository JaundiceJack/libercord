// Import router stuff
import { Link } from 'react-router-dom';
// Import the logo image
import logo from '../images/lclogo.png'

const Logo = () => {
  return (
    <Link to="/" className="logo transform duration-75 hover:scale-110">
      <img src={logo} alt="LiberCrypt Logo" />
    </Link>
  );
};

export default Logo;
