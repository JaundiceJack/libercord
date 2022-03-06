// Import basics
import { useDispatch, useSelector } from 'react-redux';
// Import router stuff
import { Link } from 'react-router-dom';
// Import dispatch actions
import { setPage } from '../../../actions/pageActions.js';
// Import components
import FeatureSwiper from './featureSwiper.js';
import Button from '../../input/button.js'

const Main = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  return (
    <main className={"flex flex-col items-center justify-center h-full"}>
      <div className="flex sm:flex-row flex-col">
        {/* Site Introduction */}
        <div className="self-start flex flex-col items-start px-4 mb-6 w-80 sm:w-104">
          <h1 className={
            "text-6xl font-jose font-semibold leading-tight sm:leading-normal " +
            "text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 " +
            "sm:text-left text-center w-full sm:mb-0 mb-4"}>
            Liber<br className="sm:hidden"/>Crypt </h1>
          <h2 className={
            "text-2xl font-jose leading-tight text-transparent font-semibold " +
            "bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 mb-4 " +
            " sm:text-left text-center w-full"}>
            Liberty through Finance. </h2>
          <p className={"text-blue-200 font-jose font-semibold text-md"}>
            Is your financial health making you sick?
            Let LiberCrypt Help!  Create an account or
            login to begin.</p>
        </div>

        {/* Account Buttons */}
        {user && !user.token &&
          <div className={"flex flex-col self-center items-center justify-center " +
            "p-4 relative w-48 h-28 my-4 sm:my-0"}>
            <Link to="/login" onClick={() => dispatch(setPage('login'))}
              className={"absolute bottom-20 px-4 py-2 h-10 text-center " +
              "bg-button-green rounded-lg py-2 px-6 font-semibold font-jose " +
              "transform duration-300 border-b-4 hover:border-b-0 hover:h-9 " +
              "border-green-700 "}>
              <p className={"bg-clip-text text-transparent bg-gradient-to-b " +
              "from-gray-800 via-black to-gray-800"}>Login</p>
            </Link>
            <p className="absolute bottom-12 font-jose font-semibold text-blue-200">or</p>
            <Link to="/create" onClick={() => dispatch(setPage('create'))}
              className={"absolute bottom-0 px-4 py-2 h-10 text-center " +
              "bg-button-blue rounded-lg p-2 font-semibold font-jose " +
              "transform duration-300 border-b-4 hover:border-b-0 hover:h-9 " +
              "border-blue-900 whitespace-nowrap" }>
              <p className={"bg-clip-text text-transparent bg-gradient-to-b " +
              "from-gray-900 via-black to-gray-900"}>Make an Account</p>
            </Link>
          </div>
        }
      </div>

      {/* Site Features */}
      <div className="p-8 sm:w-168 w-96">
        <FeatureSwiper />
      </div>

    </main>
  )
}

export default Main;
