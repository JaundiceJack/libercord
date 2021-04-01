// Import icons
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center">
      <p className="text-gray-50 text-center">James McNeilan</p>
      <p className="text-gray-50 text-right flex flex-row items-center"><FaRegCopyright /> 2021</p>
    </footer>
  );
};

export default Footer;
