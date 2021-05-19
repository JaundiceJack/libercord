import { cardContainerClasses, headerTextClasses, hrLeftClasses } from '../tailwinds';

const FeatureCard = ({header, text, icon}) => {
  return (
    <div className={cardContainerClasses+"h-full"}>
      <div className="flex flex-row items-end rounded-t-lg py-2 px-4 shadow-2xl">
        <p className=" mr-4">{icon}</p>
        <h2 className={headerTextClasses}>{header}</h2>

      </div>
      <div className={hrLeftClasses}></div>
      <div className="py-4 px-12 rounded-b-md">

        <p className="text-left text-blue-100 font-jose">{text}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
