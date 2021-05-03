import {BsGem} from 'react-icons/bs';

const YearTotal = ({ total, onClick, isActive }) => {
  const activeYear  = isActive ?
  "border-l border-green-700 bg-gradient-to-r from-green-900 to-transparent" : "";
  const wrapperClasses = " grid grid-cols-2 gap-3 rounded-3xl mt-4 " +
                         " hover:bg-gray-800 cursor-pointer " + activeYear;
  const yearClasses = " flex flex-row w-full justify-end " +
                      " text-blue-200 font-bold text-lg font-jose text-right ";
  const totalClasses = "text-left text-blue-200 font-bold font-jose self-center";

  return (
    <div onClick={onClick} className={wrapperClasses}>

      <div className={yearClasses}>
        <p>Year Total:</p>
      </div >
      <p className={totalClasses}>
        {total || "$0.00"}
      </p>
    </div>
  );
};

export default YearTotal;
