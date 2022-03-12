import BrowseButton from '../input/browseButton.js';

const Header = ({ text, icon, year, onNextYear, onPrevYear }) => {
  return (
    <div className={
      "w-full px-4 mb-4 flex flex-row items-center justify-center p-2 rounded " +
      "bg-header  "}>
      <p className="mr-4 text-yellow-400 text-2xl">
        {icon}
      </p>
      <h2 className={"font-bold font-jose text-2xl " +
        "text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500 "}>
        {text}
      </h2>

      <div className="ml-auto flex flex-row justify-center items-center">
        <BrowseButton direction="back" onClick={onPrevYear} />
        <h4 className="text-blue-200 text-md font-semibold">
          {year}
        </h4>
        <BrowseButton direction="next" onClick={onNextYear} />
      </div>
    </div>
  )
}

export default Header;
