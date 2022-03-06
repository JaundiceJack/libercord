// Import main image
import hero from '../../../images/bitcoin.jpg';

const Hero = () => {
  return (
    <div className={""}>
      <img src={hero} alt="Bitcoin, credit, and gold."
        className={"rounded-r-xl rounded-l-xl lg:rounded-l-none h-screen"} />
    </div>
  )
}

export default Hero;
