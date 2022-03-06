//Import Components
import Nav    from './pages/nav/_nav.js';
import Footer from './pages/footer.js'
import Routes from './routes';

const Body = () => {
  return (
    <div className={
      "min-h-screen flex sm:flex-row flex-col " +
      "bg-gradient-to-br from-black via-black to-gray-900"}>
      <Nav />
      <div className="flex flex-col w-full">
        <div className="grow">
          <Routes />
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default Body;
