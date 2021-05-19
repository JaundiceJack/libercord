// Import style presets
import { fancyText } from './tailwinds';
// Import icons
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  const footerClasses = "flex flex-row pt-4 items-center justify-center";

  return (
    <footer className={fancyText + footerClasses}>
      <p className="text-center ">
        James McNeilan
      </p>
      <p className="text-right flex flex-row items-center">
        <FaRegCopyright className="text-blue-400 mx-2 "/>
        2021
      </p>
    </footer>
  );
};

export default Footer;
