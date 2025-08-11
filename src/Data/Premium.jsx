import { useEffect } from "react";
import PremiumServicesData from "./PremiumServicesData";
import AOS from "aos";
import "aos/dist/aos.css";

const Premium = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center w-full px-4 py-10 "
      aria-labelledby="premium-services-title"
    >
      <div className="w-full max-w-6xl">
        {/* Section Title */}
        <h1
          id="premium-services-title"
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-bold font-serif text-[#9a0141] shadow-[#bf0050]/50 mb-6 text-center sm:text-left"
        >
          Premium Sports Betting Services
        </h1>

        {/* Grid of Services */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t-8 border-[#bf0050] pt-6"
          data-aos="fade-up"
        >
          {PremiumServicesData.map((Card, index) => (
            <article
              key={Card.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="bg-white rounded-[15px] shadow-xl shadow-[#bf0050]/10 p-5 flex flex-col items-center text-center transition-all ease-in duration-500
 hover:scale-105 border-2 hover:border-[#bf0050] hover:shadow-lg "
            >
              <img
                src={Card.image}
                alt={Card.desc}
                className="rounded-[20px] w-24 h-24 sm:w-28 sm:h-28 mt-2 object-cover shadow-xl shadow-[#bf0050]/10"
              />
              <h2 className="font-bold text-lg sm:text-xl mt-3 font-serif text-[#a2014d]">
                {Card.title}
              </h2>
              <p className="font-mono text-sm sm:text-base text-[#c3024f] mt-2">
                {Card.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Premium;
