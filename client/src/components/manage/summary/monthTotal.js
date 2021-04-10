const MonthTotal = ({ month, total }) => {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-lg hover:bg-gray-800">
      <p className="text-right text-blue-200 font-bold">
        {month}:</p>
      <p className="text-left text-blue-200 font-bold">
        {total || "$0.00"}</p>
    </div>
  );
};

export default MonthTotal;
