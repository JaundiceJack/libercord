import InfoCard from './infocard';
import hero from '../images/crypto.jpg';

const Reasons = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">

      <img className="rounded-lg border-solid border-4 border-gray-800 col-span-2 xl:col-span-1 mb-10"
           src={hero}
           alt="Bitcoin & Gold"></img>

      <div className="col-span-2 xl:col-span-1 mb-10">
        <h1 className="text-3xl text-gray-50 text-center mb-4">Why does cryptocurrency exist?</h1>
        <p className="text-white text-left mx-3">The short answer is "Trust".
        The longer answer is, when a small group of people are given the power
        to control the supply of currency, in no point in human history has that
        group not turned that ability to it's advantage at the expense of others,
        whether knowingly or otherwise. By establishing a currency with a monetary
        policy outside of the control of any singular government, cryptocurrency
        aims to provide a safe haven from inflation in the digital age
        in the way that gold did in the stone age.</p>
      </div>
      <InfoCard header="Manipulation Resistance"
                text="poop"
                examples={["", "", ""]} />
      <InfoCard header="Privacy"
                text="poop"
                examples={["", "", ""]} />
      <InfoCard header="Automation"
                text="poop"
                examples={["", "", ""]} />
      <InfoCard header=""
                text="poop"
                examples={["", ""]} />
    </div>
  );
};

export default Reasons;
