import {BsGem} from 'react-icons/bs';

const MonthTotal = ({ month, total, onClick, isActive}) => {
  const activeMonth  = isActive ? "border-l border-green-700 bg-gradient-to-r from-green-900 to-transparent" : "";
  const wrapperClasses = " grid grid-cols-2 gap-3 rounded-lg w-full " +
                         " hover:bg-gray-800 cursor-pointer " + activeMonth;
  const monthClasses = " flex flex-row w-full items-center " +
                       " text-blue-200 font-bold font-jose " +
                       (isActive ? "justify-between" : "justify-end");
  const totalClasses = "text-left text-blue-200 font-bold font-jose";

  return (
    <div onClick={onClick} className={wrapperClasses}>

      <p className={monthClasses}>
        {isActive && <BsGem style={{transform: 'rotate(-90deg)'}} size="12px" color="#2c3" className="mx-auto sm:ml-1 " />}
        {month}:
      </p>
      <p className={totalClasses}>
        {total < 0 ? "-$"+Math.abs(total) : "$"+total}
      </p>
    </div>
  );
};

export default MonthTotal;
