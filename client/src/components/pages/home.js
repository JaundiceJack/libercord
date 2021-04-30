// Import components
import FeatureCard from './featureCard';
// Import main image
import hero from '../../images/bitcoin.jpg';
// Import icons
import { FaHeartbeat, FaChartLine, FaBalanceScale, FaPiggyBank } from 'react-icons/fa';
import { GiVelociraptorTracks, GiBackwardTime, GiImprisoned, GiPiggyBank, GiScales } from 'react-icons/gi';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { BiTimer, BiLineChart } from 'react-icons/bi';
import { AiOutlineLineChart } from 'react-icons/ai';

import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/swiper-bundle.css';



const Home = () => {
  const containerClasses = "relative z-10 lg:max-w-2xl lg:w-full rounded-lg " +
                           " h-full flex items-center " +
                           " bg-gradient-to-r from-black to-gray-900 ";

  const dividerClasses = " absolute hidden lg:block absolute right-0 inset-y-0 " +
                         " h-full w-48 text-white transform translate-x-1/2 ";

  const contentClasses = " px-8 py-4 flex flex-col ";

  const h1Classes = " font-libre text-6xl leading-normal " +
  " bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-blue-400 "
  const h2Classes = " font-libre text-3xl leading-tight " +
  " bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-blue-500 "
  const introTextClasses = "mt-3 text-lg text-gray-300 font-jose "

  const heroImageClasses = "h-56 sm:h-72 md:h-96 lg:h-full w-full mt-4 sm:mt-0 " +
                           " object-cover rounded-r-xl rounded-l-xl sm:rounded-l-none "


  const cards = [
    <FeatureCard header="Balance Spending"
    text="Enter your daily expenses and income to see exactly where your money is going."
    icon=<GiScales size="40px" color="#ABC" /> />,
    <FeatureCard header="Track Savings"
    text="See exactly how much you're saving (or losing) each month, and what you can cut back on to save more."
    icon=<GiPiggyBank size="40px" color="#ABC" /> />,
    <FeatureCard header="Monitor Assets"
    text="Get up-to-date stock, crypto, and precious metals prices when you're ready to invest."
    icon=<AiOutlineLineChart size="40px" color="#ABC" /> />,
    <FeatureCard header="Limit Liabilities"
    text="Keep records of your loans, debts, and mortgage to keep your wallet above water."
    icon=<GiImprisoned size="40px" color="#ABC" /> />
  ]


  // install Swiper modules
  SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);

  return (
    <div className="relative flex-grow">
      <div className={containerClasses}>

        {/* Make a divider shape with an svg */}
        <svg className={dividerClasses}
             viewBox="0 0 100 100"
             preserveAspectRatio="none" fill="inherit">
          <defs>
            <linearGradient id="grad" gradientTransform="rotate(0)">
              <stop offset="0%"   stop-color="#111827" />
              <stop offset="100%" stop-color="#222938" />
            </linearGradient>
          </defs>
          <polygon fill="url(#grad)" points="50,1 100,50 50,99" />
        </svg>

        {/* Introduce the site */}
        <main className={contentClasses}>
          <h1 className={h1Classes}>
            LiberCrypt
          </h1>
          <h2 className={h2Classes}>
            Liberty through Finance.
          </h2>
          <p className={introTextClasses}>
            Keeping up with your financial health making you sick? Let LiberCrypt Help!
            With LiberCrypt you can record and visualize your finances to incrementally achieve your monetary goals.
          </p>

          <Swiper
            id='slider'
            className="mt-12"
            style={{marginLeft: 0, width: 600, height: 200}}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 6000 }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => {return}}
            onSwiper={(swiper) => {return}}
          >
            {cards.map(card => {
              return <SwiperSlide className="flex">
                {({ isActive }) => (
                  isActive && card
                )}
              </SwiperSlide> })}
          </Swiper>
        </main>
      </div>

      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img className={heroImageClasses} src={hero} alt="" />
      </div>
    </div>
  );
};

export default Home;

/*
<div className="grid grid-cols-2 gap-4 p-0 sm:p-2">

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


  <div className="text-center col-span-2 pt-6 p-4 bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-md">
    <span className="text-xl font-bold text-blue-200" style={{"text-shadow": "0px 0px 10px #444"}}>
      Sick of keeping track of your financial health?<br/>Let LiberCrypt help!
    </span>
    <div className="mt-6 mb-10"></div>

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
*/
