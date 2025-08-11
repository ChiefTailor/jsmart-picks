import { CardData } from "../Data/CardData";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Data = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="flex flex-col items-center justify-center w-full px-4 py-10"
      aria-labelledby="top-leagues-title"
    >
      <div className="w-full max-w-6xl">
        {/* Title */}
        <h1
          id="top-leagues-title"
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-bold font-serif text-[#9a0141] shadow-[#bf0050]/50 mb-6 text-center sm:text-left"
        >
          Top Leagues
        </h1>

        {/* Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 border-t-8 border-[#bf0050] pt-6"
          data-aos="fade-up"
        >
          {CardData.map((Card, index) => (
            <article
              key={Card.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100} // stagger animation
              className="flex flex-col items-center text-center"
            >
              <img
                src={Card.image}
                alt={Card.desc}
                className="rounded-[15px] w-32 h-32 sm:w-40 sm:h-40 mt-4 shadow-xl shadow-[#bf0050]/10 object-cover"
              />
              <h2 className="font-bold text-lg sm:text-xl mt-3 font-serif text-[#a2014d]">
                {Card.title}
              </h2>
              <p className="font-mono text-sm sm:text-base text-[#c3024f] mt-1">
                {Card.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Data;
