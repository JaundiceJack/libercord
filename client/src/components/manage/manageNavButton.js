
const ManageNavButton = ({text, value, changeSection, extraClasses}) => {
  const linkClasses = " px-3 py-2 border-b-2 border-black" +
                      " text-blue-100 font-jose text-lg " +
                      " hover:text-blue-200 hover:border-blue-400 focus:outline-none " +
                      " transform duration-150 hover:-translate-y-0.5 ";
  return (
    <button onClick={() => changeSection(value)}
            className={linkClasses + extraClasses}>
      {text}
    </button>
  );
};

export default ManageNavButton;
