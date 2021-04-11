import { cardContainerClasses, headerTextClasses, hrCenterClasses } from '../tailwinds';

const FeatureCard = ({header, text, icon}) => {
  return (
    <div className={cardContainerClasses}>
      <div className="rounded-t-lg p-2 shadow-2xl">
        <h2 className={headerTextClasses}>{header}</h2>
      </div>
      <div className={hrCenterClasses}></div>
      <div className="p-4 rounded-b-md">
        <p className="float-left mr-4">{icon}</p>
        <p className="text-left text-blue-100 font-bold">{text}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
