import BrowseButton from '../input/browseButton.js';

const Header = ({ header, icon, year, next, prev }) => {
  return (
    <div className={
      `w-full h-14 p-2 flex flex-row items-center justify-center rounded-t-lg bg-header`}>
      <p className="mr-4 text-yellow-400 text-2xl">
        {icon}
      </p>
      <h2 className={"font-bold font-jose text-2xl " +
        "text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500 "}>
        {header}
      </h2>

      <div className={`${!header && !icon ? " " : "ml-auto "}
        flex flex-row justify-center items-center`}>
        <BrowseButton direction="back" onClick={prev} />
        <h4 className="text-blue-200 text-md font-semibold">
          {year}
        </h4>
        <BrowseButton direction="next" onClick={next} />
      </div>
    </div>
  )
}

export default Header;
