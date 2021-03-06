// Swiper version: 6.8.4

// Import Swiper React components
import SwiperCore, { A11y, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import components
import FeatureCard from './featureCard.js';
// Import icons
import { GiScales, GiPiggyBank } from 'react-icons/gi'
import { AiOutlineLineChart } from 'react-icons/ai'
// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
// Initialize modules
SwiperCore.use([A11y, Pagination, Autoplay]);

const FeatureSwiper = () => {

  const features = [
    <FeatureCard
      header="Balance Spending"
      text="Enter your daily expenses and income to see exactly where your money is going."
      icon={<GiScales size="40px"  />} />,
    <FeatureCard
      header="Track Savings"
      text="See exactly how much you're saving (or losing) each month, and what you can cut back on to save more."
      icon={<GiPiggyBank size="40px"  />} />,
    <FeatureCard
      header="Chart Progress"
      text="Get a visualization of how you're doing each month and year with financial summary charts."
      icon={<AiOutlineLineChart size="40px"  />} />
  ]

  return (
    <div className={"rounded-lg container-bg-dark px-2 py-4 flex"} style={{minHeight: 200+"px"}}>
      {/* Main Swiper */}
      <Swiper loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        slidesPerView={1}
        style={{
          "--swiper-navigation-color": "rgb(253 224 71)",
          "--swiper-pagination-color": "rgb(253 224 71)",
        }} >

        {features.map((feature, index) => (
          <SwiperSlide key={feature} virtualIndex={index} >
            {feature}
          </SwiperSlide>
        ))}

        <div className="swiper-pagination" />
      </Swiper>
    </div>
  )
}

export default FeatureSwiper;
