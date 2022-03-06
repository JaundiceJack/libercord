// Import Components
import Divider from './divider.js';
import Hero from './hero.js';
import Main from './main.js';

const Home = () => {
  return (
    <div className={"relative grid sm:grid-cols-5 grid-cols-1 h-full w-full"}>
      <div className={"flex flex-col z-20 bg-gradient-to-r from-black to-gray-900 h-screen sm:col-span-3"}>
        <Main />

      </div>
      <Divider />
      <div className="absolute right-0 z-0 sm:block hidden">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
