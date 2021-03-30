const linkClasses = "px-3 py-2  border-b-2 border-black " +
"text-gray-300 text-sm font-medium " +
"hover:border-blue-400 hover:text-white focus:outline-none ";




const ManageNavButton = ({text, value, changeSection, extraClasses}) => {
  return (
    <button onClick={() => changeSection(value)} className={extraClasses ? linkClasses + extraClasses : linkClasses}>
      {text}
    </button>
  );
};

export default ManageNavButton;
