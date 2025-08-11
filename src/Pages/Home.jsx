import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Premium from "../Data/Premium";
import logo from "../images/logo.png";
import Card from "../Components/Data";
import Form from "./Form";
import SocialButton from "../Components/SocialButton";
import FloatingBackground from "../Components/FloatingBackground";
import LogoSvg from "../Data/LogoSvg";
import Footer from "../Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Home as HomeIcon,
  Info,
  Star,
  Package,
  Phone,
  Play,
  Trophy,
  XIcon,
  MenuIcon,
  TrophyIcon,
} from "lucide-react";
import TestimonialCarousel from "../Components/Testimonial";
import StatsCounter from "../Components/Statistics";
import TrustedSportsbooks from "../Components/TrustedSport";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const links = [
    { name: "Home", link: "home", icon: <HomeIcon size={18} /> },
    { name: "About", link: "about", icon: <Info size={18} /> },
    { name: "Premium", link: "premium", icon: <Star size={18} /> },
    { name: "Packages", link: "testimonials", icon: <Package size={18} /> },
    { name: "Contact", link: "contact", icon: <Phone size={18} /> },
  ];

  const handleScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const handleDiscordClick = () => {
    toast.info("Redirecting to Discord...", {
      style: { backgroundColor: "#bf0050", color: "#fff" },
    });
    setTimeout(() => {
      window.open("https://discord.gg/hnUux68kAp", "_blank");
    }, 1200);
  };

  return (
    <div className=" ">
      {/* Navigation */}
      <nav className="flex items-center justify-between fixed top-0 w-full bg-white font-bold z-30 shadow-md px-4 md:px-10 py-3">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto bg-white font-bold">
          <div className="flex items-center gap-3" data-aos="fade-right">
            <img
              src={logo}
              alt="J-Smart Picks"
              className="w-[60px] md:w-[80px]"
            />
            <span className="text-lg md:text-xl font-extrabold text-[#bf0050] tracking-wide">
              J-Smart Picks
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-6 p-4 text-sm md:text-lg font-sans">
            {links.map((link, index) => (
              <li key={index}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScroll(link.link)}
                  className="flex items-center gap-2 text-black hover:text-[#bf0050] transition"
                >
                  {link.icon}
                  {link.name}
                </motion.button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/packages")}
              className="hidden lg:block bg-[#bf0050] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              SUBSCRIBE NOW
              <TrophyIcon className="inline-block ml-2" size={15} />
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 bg-white rounded-lg shadow-xl lg:hidden overflow-hidden z-30 border-2 w-full"
          >
            <ul className="flex flex-col py-2">
              {links.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleScroll(link.link)}
                    className="w-full text-left px-6 py-3 flex items-center gap-3 text-black hover:bg-gray-50 hover:text-[#bf0050] transition"
                  >
                    {link.icon}
                    <span className="font-medium">{link.name}</span>
                  </button>
                </motion.li>
              ))}
              <li className="border-t border-gray-100 mt-1">
                <button
                  onClick={() => navigate("/packages")}
                  className="w-full text-left px-6 py-3 flex items-center gap-3 text-white bg-[#bf0050] hover:bg-pink-700 transition"
                >
                  <TrophyIcon />
                  <span className="font-medium">SUBSCRIBE NOW</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <section className="relative w-full h-[250vh] sm:h-[1100px] md:h-[1500px] lg:h-[1200px] xl:h-[1300px] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 sm:bg-cover sm:bg-center"
            style={{
              backgroundImage: "url('./Jsmart-bg.png')",
              filter: "brightness(0.7) saturate(1.2)",
            }}
          />
          <FloatingBackground />
        </div>

        <div
          id="home"
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 pt-[200px] max-w-7xl mx-auto"
          data-aos="fade-up"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight text-white">
            DESTINATION FOR PREMIUM <br /> SPORT CONTENT
          </h1>

          <p className="mt-4 text-gray-200 text-base sm:text-lg max-w-2xl font-semibold">
            Win More with Accurate Predictions,{" "}
            <span className="text-red-600">In-Depth Analysis</span>, and Proven
            Sports Betting Strategies.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              className="flex gap-2 px-6 md:px-8 py-3 md:py-6 bg-red-700 text-white text-base md:text-lg rounded-lg font-semibold hover:bg-red-600 hover:shadow-lg hover:shadow-red-600 hover:scale-110 transition"
             onClick={() => navigate("/packages")}
            >
              <Trophy /> Get Premium Picks
            </button>
            <button
              className="flex gap-2 px-6 md:px-8 py-3 md:py-6 bg-white text-red-700 text-base md:text-lg rounded-lg font-semibold hover:bg-wheat hover:shadow-lg hover:shadow-white transition hover:scale-110"
              onClick={handleDiscordClick}
            >
              <Play /> Join Discord
            </button>
          </div>

          <div className="mt-12 w-full">
            <LogoSvg />
          </div>
          <StatsCounter />
        </div>
      </section>

      {/* About */}
      <section id="about" className="pt-28" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Card />
        </div>
      </section>
      {/* TrustedSports */}
      <section id="trusted-sports" className="pt-28" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <TrustedSportsbooks />
        </div>    
      </section>

      {/* Premium */}
      <section id="premium" className="pt-28" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Premium />
        </div>
      </section>
      {/* Testimonials */}
      <section id="testimonials" className="pt-28" data-aos="fade-up">
        <div className="bg-[#0a0f1c] mx-auto px-4 md:px-8">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative pt-28 pb-20 bg-black overflow-hidden"
      >
        {/* Gradient background blur */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-[#ff2c40] rounded-full blur-[120px] opacity-20 "></div>
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-[#e60023] rounded-full blur-[120px] opacity-20"></div>
        </div>

        <div
          className="relative max-w-7xl mx-auto px-4 md:px-8 grid gap-2 lg:gap-10 lg:grid-cols-2 items-center"
          data-aos="fade-up"
        >
          {/* Left Column */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Contact <span className="text-[#ff2c40]">Us</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto md:mx-0 mb-8">
              Have a question or an enquiry? Drop us a message and we’ll get
              back to you quickly.
            </p>
            <SocialButton />
          </div>

          {/* Right Column */}
          <Form />
        </div>
         <motion.div 
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" }}
          >
            <a 
              href="/packages"
              className="px-8 py-4 bg-gradient-to-r from-[#ff0033] to-[#ff5e62]  rounded-lg text-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all text-white z-30"
            >
              Get Started
            </a>
          </motion.div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center" // 👈 change to top-center if you want it at the top middle
        autoClose={2000}
        newestOnTop
      />
    </div>
  );
};

export default Home;
