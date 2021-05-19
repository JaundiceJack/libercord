// Import basics
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// Import components
import FeatureCard from './featureCard';
// Import main image
import hero from '../../images/bitcoin.jpg';
// Import style presets
import { buttonClasses } from '../tailwinds';
// Import router stuff
import { Link } from 'react-router-dom';
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
// Import actions
import { changePage } from '../../actions/authActions';


const Home = () => {
  // Change the highlighted page icon
  const dispatch = useDispatch();
  const changeActive = nextPage => { dispatch(changePage(nextPage)) }

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
    <div className="relative flex-grow flex flex-col">
      <div className="lg:mr-0 sm:mr-8 mr-0 relative z-10 lg:w-1/2 \
                      rounded-lg h-full flex items-center \
                      bg-gradient-to-r from-black to-gray-900 ">

        {/* Make a divider shape with an svg */}
        <svg className="absolute hidden lg:block absolute right-0 inset-y-0 \
                        h-full w-48 text-white transform translate-x-1/2 "
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
        <main className="lg:px-0 lg:py-0 sm:px-8 sm:py-4 px-2 py-2   \
                         flex flex-col lg:mx-0 mx-auto ">
          <div className="flex flex-col items-start">
            <h1 className="w-full sm:text-left text-center text-6xl  \
                           font-libre leading-tight sm:leading-normal text-transparent  \
                           bg-clip-text bg-gradient-to-b from-gray-200 to-blue-400    ">
              Liber<br className="sm:hidden"/>Crypt
            </h1>
            <h2 className="mt-3 w-full sm:text-left text-center text-3xl  \
                           font-libre leading-tight text-transparent \
                           bg-clip-text bg-gradient-to-b from-gray-300 to-blue-500 ">
              Liberty through Finance.
            </h2>
            <p className="mt-3 w-full sm:text-left text-center text-lg \
                          font-jose text-blue-100">
              Keeping up with your financial health making you sick?
            </p>
            <div className="mt-2 flex sm:flex-row flex-col mx-auto sm:mx-0 items-baseline">
              <p className="sm:mr-4 font-jose font-semibold text-blue-200 \
                            sm:text-left text-center w-full">
                Let LiberCrypt Help!
              </p>
              <div className="mt-6 sm:mt-2 flex flex-row items-center">
                <Link to="/login" onClick={() => changeActive('login')}>
                  <button className={buttonClasses+
                    "mr-3 border-green-600 text-green-400 whitespace-nowrap"}>
                    Log In
                  </button>
                </Link>
                <p className="mr-3 font-jose font-semibold text-blue-200">or</p>
                <Link to="/create" onClick={() => changeActive('create')}>
                  <button className={buttonClasses+
                    "border-blue-400 text-blue-300 whitespace-nowrap"}>
                    Make an Account
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* App Details Slider */}
          <div className="w-80 sm:w-120 md:w-152 lg:w-120 sm:self-start self-center">
            <Swiper
              id='slider'
              autoWidth='true'
              className="my-6 md:mb-2 md:mt-12"
              style={{marginLeft: 0, height: 200}}
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
                return <SwiperSlide className="">
                         {({ isActive }) => ( isActive && card )}
                       </SwiperSlide> })}
            </Swiper>
          </div>
        </main>
      </div>

      {/* Hero Image */}
      <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-3/5 px-2 \
                      sm:mr-0 -mr-2 sm:px-8 sm:py-4 lg:px-0 lg:py-0">
        <img className="sm:h-56 md:h-80 lg:h-full w-full mt-4 lg:mt-0 \
                        object-cover rounded-r-xl rounded-l-xl lg:rounded-l-none "
                        src={hero} alt="Bitcoin, credit, and gold." />
      </div>
    </div>
  );
};

export default Home;
