const InfoSection = ({image, imageAlt, header, intro, infocards}) => {
  return (
        <div className="grid grid-cols-2 gap-4 p-6">
          <img className="rounded-lg border-solid border-4 border-gray-800 col-span-2 xl:col-span-1 mb-10"
               src={image}
               alt={imageAlt}></img>

          <div className="col-span-2 xl:col-span-1 mb-10">
            <h1 className="text-3xl text-gray-50 text-center mb-4">{header}</h1>
            <p className="text-white text-left mx-3">{intro}</p>
          </div>
          {infocards.map((card) => {
            return card;
          })}
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

export default InfoSection;
