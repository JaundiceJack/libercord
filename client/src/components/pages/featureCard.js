const cardContainerClasses =
  "col-span-2 xl:col-span-1 mb-2 " +
  " rounded-xl border-l border-gray-700 " +
  "bg-gradient-to-br from-gray-900 to-black  ";

const headerTextClasses =
  "bg-clip-text text-transparent font-semibold text-2xl " +
  "bg-gradient-to-b from-gray-100 to-blue-400 ";

const hrClasses =
  "h-px w-full bg-gradient-to-r from-transparent via-yellow-600 to-transparent";

const FeatureCard = ({header, text, icon}) => {
  return (
    <div className={cardContainerClasses}>
      <div className="rounded-t-lg p-2 shadow-2xl">
        <h2 className={headerTextClasses}>{header}</h2>
      </div>
      <div className={hrClasses}></div>
      <div className="p-4 rounded-b-md">
        <p className="float-left mr-4">{icon}</p>
        <p className="text-left text-blue-100 font-bold">{text}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
