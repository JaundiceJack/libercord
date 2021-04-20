
const ManageNavButton = ({text, value, changeSection, extraClasses}) => {
  const linkClasses = " px-3 py-2  border-b-2 border-black" +
                      " hover:border-blue-400 hover:text-white focus:outline-none " +
                      " bg-clip-text text-transparent " +
                      " bg-gradient-to-br from-blue-100 to-blue-300 ";
  return (
    <button onClick={() => changeSection(value)}
            className={linkClasses + extraClasses}>
      {text}
    </button>
  );
};

export default ManageNavButton;
