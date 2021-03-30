const InfoCard = ({header, text, examples}) => {
  return (
    <div className="col-span-2 xl:col-span-1 p-6 mb-2 bg-gray-800 text-center rounded-md shadow-xl">
      <h2 className="text-gray-400 font-semibold text-2xl">{header}</h2>
      <hr className="my-4 border-1"/>
      <div>
        <p className="text-left text-gray-400 mb-4">{text}</p>
        <ul className="font-semibold text-gray-400 text-left list-disc ml-5">
          {examples.map((example) => {
            return <li>{example}</li>
          })}
        </ul>
      </div>
    </div>
  );
};

export default InfoCard;
