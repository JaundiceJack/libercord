const FeatureCard = ({header, text, icon, extraClasses}) => {
  return (
    <div className={"flex flex-col w-full h-full mx-auto py-4 px-12 " + extraClasses}>
      <div className={"flex flex-row justify-center mb-2"}>
        <p className={"text-yellow-400 mr-2 shadow-lg"}>{icon}</p>
        <h2 className={"self-end font-bold font-jose text-transparent bg-clip-text " +
        "bg-gradient-to-b from-yellow-200 to-yellow-500 text-xl"}>{header}</h2>
      </div>

      <div className="">
        <p className="font-semibold font-jose text-gray-200 text-md">{text}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
