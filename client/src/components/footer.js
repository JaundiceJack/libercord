// Import icons
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center \
     bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-500">
      <p className="text-center ">James McNeilan</p>
      <p className="text-right flex flex-row items-center"><FaRegCopyright className="text-blue-400"/> 2021</p>
    </footer>
  );
};

export default Footer;
