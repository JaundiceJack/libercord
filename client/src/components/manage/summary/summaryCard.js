import {cardContainerClasses, headerTextClasses, hrLeftClasses } from '../../tailwinds';

const SummaryCard = ({header, text}) => {
  return (
    <div style={{"height": "200px"}} className={cardContainerClasses+"col-span-2 sm:col-span-1"}>
      <div className="pt-2 pl-2 pb-1 shadow-2xl">
        <h2 className={headerTextClasses}>{header}</h2>
      </div>
      <div className={hrLeftClasses}></div>
      <div className="rounded-b-md p-4">
        <p className="text-left text-blue-200 font-bold">{text}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
