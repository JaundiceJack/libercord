const SummaryCard = ({header, text}) => {
  return (
    <div style={{"height": "200px"}} className="col-span-2 xl:col-span-1 mb-2 ring-2 ring-gray-700 bg-gradient-to-br from-gray-700 to-gray-500 rounded-md">
      <div className="bg-gray-900 rounded-t-md p-2 shadow-2xl">
        <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-gray-100 to-blue-400 font-semibold text-2xl">{header}</h2>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
      <div className="rounded-b-md p-4">
        <p className="text-left text-blue-200 font-bold">{text}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
