const cardContainerClasses =
  "col-span-2 xl:col-span-1 mb-2 " +
  " rounded-xl border-l border-gray-700 " +
  "bg-gradient-to-br from-gray-900 to-black ";

const headerTextClasses =
  "bg-clip-text text-transparent font-semibold text-2xl " +
  "bg-gradient-to-b from-gray-100 to-blue-400 ";

const hrClasses =
  "h-px w-full bg-gradient-to-r from-yellow-600 to-transparent";


const SummaryCard = ({header, text}) => {
  return (
    <div style={{"height": "200px"}} className={cardContainerClasses}>
      <div className="pt-2 pl-2 pb-1 shadow-2xl">
        <h2 className={headerTextClasses}>{header}</h2>
      </div>
      <div className={hrClasses}></div>
      <div className="rounded-b-md p-4">
        <p className="text-left text-blue-200 font-bold">{text}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
