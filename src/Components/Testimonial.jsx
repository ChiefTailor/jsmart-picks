import React, { useState } from "react";
import Slider from "react-slick";
import { Star, RefreshCw } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const initialTestimonials = [
  { name: "Liam Parker", location: "New York, NY", text: "J-Smart Picks consistently delivers winning strategies. Their insights have boosted my betting success dramatically." },
  { name: "Sophia Carter", location: "Los Angeles, CA", text: "The attention to detail in J-Smart Picks is unmatched. I’ve learned so much and made steady profits." },
  { name: "Ethan Brooks", location: "Chicago, IL", text: "With J-Smart Picks, I finally feel confident placing my bets. Their predictions are on point." },
  { name: "Isabella Turner", location: "Miami, FL", text: "The Discord community is amazing, and the J-Smart Picks team is always active and supportive." },
  { name: "Mason Lee", location: "Dallas, TX", text: "I’ve tried other tipsters, but J-Smart Picks stands out with accuracy and professionalism." },
  { name: "Ava Mitchell", location: "Phoenix, AZ", text: "Clear, concise, and reliable betting advice. My bankroll has never looked better." },
  { name: "Noah Wilson", location: "Philadelphia, PA", text: "The giveaways are a fun bonus, but the real win is the consistent betting edge." },
  { name: "Mia Robinson", location: "Las Vegas, NV", text: "Even here in Vegas, J-Smart Picks gives me angles the sportsbooks don’t see." },
  { name: "James Anderson", location: "Seattle, WA", text: "The lifetime membership is worth every penny. I trust their calls completely." },
  { name: "Charlotte Martinez", location: "Denver, CO", text: "Since joining, my confidence and winnings have soared. Highly recommend J-Smart Picks!" },
];

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const shuffleTestimonials = () => {
    setTestimonials([...testimonials].sort(() => Math.random() - 0.5));
  };

  const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 800,
  slidesToShow: 1, // default for mobile
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768, // <= 768px
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1024, // <= 1024px
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};


  return (
    <section className="py-12 md:py-20 bg-[#0a0f1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with responsive adjustments */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10 gap-3 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#ff0033] flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#ff0033]" /> 
            What Our Members Say
          </h2>
          <button
            onClick={shuffleTestimonials}
            className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#ff0033] to-[#bf0050] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:opacity-90 transition text-sm sm:text-base"
          >
            <RefreshCw size={16} className="sm:w-5 sm:h-5" /> 
            <span>Refresh</span>
          </button>
        </div>

        {/* Responsive Carousel */}
        <Slider {...settings}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="px-2 sm:px-3">
              <Card t={t} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const Card = ({ t }) => (
  <div className="bg-[#141b2d] p-4 sm:p-5 md:p-6 rounded-2xl shadow-lg border border-[#ff0033]/10 hover:border-[#ff0033]/40 transition h-full">
    <div className="flex mb-2 sm:mb-3 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px]" fill="gold" stroke="gold" />
      ))}
    </div>
    <p className="text-gray-300 italic mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">"{t.text}"</p>
    <p className="text-white font-semibold text-sm sm:text-base">{t.name}</p>
    <p className="text-xs sm:text-sm text-gray-400">{t.location}</p>
  </div>
);

export default TestimonialCarousel;
