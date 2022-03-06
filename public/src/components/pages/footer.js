// Import icons
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={
      " flex flex-row pt-4 items-center justify-center " +
      " bg-clip-text text-transparent font-semibold font-jose " +
      " bg-gradient-to-b from-gray-100 to-blue-400 "}>
      <p className="text-center ">
        James McNeilan
      </p>
      <p className="text-right flex flex-row items-center">
        <FaRegCopyright className="text-blue-400 mx-2 "/>
        2022
      </p>
    </footer>
  );
};

export default Footer;
