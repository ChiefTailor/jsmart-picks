import LogoData from "./LogoData";

const LogoSvg = () => {
  return (
    <div className="w-full px-4">
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 place-items-center"
      >
        {LogoData.map((Card, index) => (
          <div
            key={index}
            className="gradientContainer flex flex-col items-center justify-center 
                       border border-[#bf0050]/20 rounded-xl shadow-lg shadow-[#bf0050]/10 
                       p-3 sm:p-4 w-[120px] sm:w-[140px] md:w-[160px] 
                       transition-transform transform hover:scale-105 hover:shadow-[#bf0050]/30 
                       bg-white/90 backdrop-blur-md"
          >
            <div className="bg-[#a2014d] flex items-center justify-center rounded-2xl 
                            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
              <img
                src={Card.image}
                alt={Card.title}
                className="rounded-xl w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
              />
            </div>
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl 
                          mt-2 sm:mt-3 text-[#210fae] text-center">
              {Card.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoSvg;
