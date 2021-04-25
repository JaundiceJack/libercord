// Import components
import FeatureCard from './featureCard';
// Import main image
import hero from '../../images/money.jpg';
// Import icons
import { FaHeartbeat } from 'react-icons/fa';
import { GiVelociraptorTracks, GiBackwardTime } from 'react-icons/gi';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { BiTimer } from 'react-icons/bi';

const Home = () => {
  const introTextClasses = " font-libre " +
  " bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-blue-400 "

  //

  return (
    <div className="grid grid-cols-2 gap-4 p-0 sm:p-2">
      {/* Introductory Image */}
      <div className="col-span-2 relative">
        <img className="rounded-lg" src={hero} alt="Bitcoin & Gold"></img>
        <div className="sm:absolute sm:top-5 mb-2 sm:mb-0 mt-4 sm:mt-0 pl-6 flex flex-col text-center sm:text-left">
          <span className={introTextClasses+"text-5xl font-extrabold mb-2"}>
            LiberCrypt
          </span>
          <span className={introTextClasses+"text-2xl font-bold"}>
            Liberty through finance.
          </span>
        </div>
        <div className="h-0.5 w-full bg-gradient-to-r from-black via-blue-600 to-transparent"></div>
      </div>

      {/* Introduction */}
      <div className="text-center col-span-2 pt-6 p-4 bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-md">
        <span className="text-xl font-bold text-blue-200" style={{"text-shadow": "0px 0px 10px #444"}}>
          Sick of keeping track of your financial health?<br/>Let LiberCrypt help!
        </span>
        <div className="mt-6 mb-10"></div>
        {/* Site Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FeatureCard header="Manage Financial Health"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          icon=<FaHeartbeat size="60px" color="#ABC" /> />
          <FeatureCard header="Track Assets & Income"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          icon=<GiVelociraptorTracks size="60px" color="#ABC" /> />
          <FeatureCard header="Limit Expenses & Liabilities"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          icon=<IoSpeedometerOutline size="60px" color="#ABC" /> />
        </div>
      </div>
    </div>
  );
};

export default Home;
