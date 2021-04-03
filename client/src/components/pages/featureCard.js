const FeatureCard = ({header, text, image}) => {
  return (
    <div className="col-span-2 xl:col-span-1 mb-2 ring-2 ring-gray-800 rounded-t-lg rounded-b-md">
      <div className="bg-gray-900 rounded-t-lg p-2 shadow-2xl">
        <h2 className="bg-clip-text text-transparent \
         bg-gradient-to-b from-gray-100 to-blue-400 font-semibold text-2xl">{header}</h2>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
      <div className="bg-gradient-to-br from-gray-700 to-gray-500 p-4 rounded-b-md">
        <p className="text-left text-blue-100 font-bold">{text}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
