const Header = ({ text, icon }) => {
  return (
    <div className={
      "self-center flex items-center justify-center h-10 p-6 rounded " +
      "bg-header  "}>
      <p className="mr-4 text-yellow-400 text-2xl">
        {icon}
      </p>
      <h2 className={"font-bold font-jose text-2xl " +
        "text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-500 "}>
        {text}
      </h2>
    </div>
  )
}

export default Header;
