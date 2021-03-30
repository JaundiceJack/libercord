import logo from '../images/lclogo.png'

const Logo = () => {
  return (
    <a href="/home" className="logo transform duration-75 hover:scale-110">
      <img src={logo} alt="LiberCrypt Logo" />
    </a>
  );
};

export default Logo;
