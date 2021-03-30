import InfoCard from './infocard.js';
import hero from '../../images/money.jpg';

const Money = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <div className="col-span-1 mb-10">
        <img className="rounded-lg border-solid border-4 border-gray-800" src={hero} alt="Bitcoin & Gold"></img>
      </div>
      <div className="col-span-1 mb-10">
        <h1 className="text-3xl text-gray-50 text-center mb-4">What is money?</h1>
        <p className="text-white text-left mx-3">When you think of the word money,
        do images of green paper come to mind, or is it a vault of gold coins?
         Money means many different things to many different
        people but it can be generalized into four primary purposes. </p>
      </div>
      <InfoCard header="Storing Value"
                text="If you want to pass on what you've worked for in life to the next generation, you'll need something that lasts longer than a house or herds of goats."
                examples={["Gold", "Bitcoin", "Art & Artifacts"]} />
      <InfoCard header="Transacting"
                text="Since it's difficult and dangerous to carry around gold or the Mona Lisa each time you want to trade for something, smaller denominations become neccessary for everyday purchases."
                examples={["Silver", "Monero", "Dollars"]} />
      <InfoCard header="Organizing"
                text="Governments and organizations can collect funds to direct public projects. In this sense, money can be thought of as an incentive structure to promote individuals towards greater purposes."
                examples={["Taxation", "Interest Rates", "Patronage"]} />
      <InfoCard header="Measuring Scarcity"
                text="In a basic sense, money can be thought of as the tool we use to represent how rare or scarce an item is. For example, there is only one Hope Diamond, so it is nearly priceless, but grains of sand are nearly worthless due to their number."
                examples={["Supply & Demand", "Rarities vs Common Items"]} />
    </div>
  );
};

export default Money;
