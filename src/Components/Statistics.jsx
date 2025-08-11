import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const StatsCounter = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    members: 0,
    winRate: 0,
    picks: 0,
    sports: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const stats = [
    { value: counts.members, label: "Happy Subscribers" },
    { value: counts.winRate, label: "Win Rate %" },
    { value: counts.picks, label: "Winning Picks" },
    { value: counts.sports, label: "Sports Covered" },
  ];

  const icons = [
    <svg
      key="members"
      className="w-12 h-12 text-[#ff0033] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>,
    <svg
      key="winrate"
      className="w-12 h-12 text-[#ff0033] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
    <svg
      key="picks"
      className="w-12 h-12 text-[#ff0033] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>,
    <svg
      key="sports"
      className="w-12 h-12 text-[#ff0033] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
      />
    </svg>,
  ];
  const handleScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  // Intersection Observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Count up animation when component becomes visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1000; // 2 seconds
    const increment = 25; // ms
    const steps = duration / increment;

    const targets = {
      members: 3000,
      winRate: 85,
      picks: 10500,
      sports: 12,
    };

    const stepValues = {};
    Object.keys(targets).forEach((key) => {
      stepValues[key] = targets[key] / steps;
    });

    let currentCounts = { ...counts };
    const interval = setInterval(() => {
      let completed = true;

      Object.keys(targets).forEach((key) => {
        if (currentCounts[key] < targets[key]) {
          currentCounts[key] = Math.min(
            currentCounts[key] + stepValues[key],
            targets[key]
          );
          completed = false;
        }
      });

      setCounts({ ...currentCounts });

      if (completed) {
        clearInterval(interval);
      }
    }, increment);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={containerRef} className="py-16 relative overflow-hidde">
      {/* Glowing Breathing Background */}
      {/* Glowing Breathing Background */}
      <div className="absolute inset-0 -z-10">
        {/* Large pulsating glow */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[50%] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff0033]/30 via-[#ff0033]/40 to-transparent rounded-lg animate-pulse-slow" />
        </div>

        {/* Floating circles */}
        <svg
          className="absolute top-1/4 left-1/4 opacity-20 animate-float"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          <circle cx="60" cy="60" r="50" fill="#ff0033" />
        </svg>
        <svg
          className="absolute top-1/3 right-1/4 opacity-20 animate-float-delay"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <circle cx="40" cy="40" r="35" fill="#ff0033" />
        </svg>
        <svg
          className="absolute bottom-1/4 left-10 opacity-20 animate-float"
          width="60"
          height="60"
          viewBox="0 0 60 60"
        >
          <circle cx="30" cy="30" r="25" fill="#ff0033" />
        </svg>

        {/* Diagonal lines pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          preserveAspectRatio="none"
        >
          <pattern
            id="diagonalPattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="20"
              y2="20"
              stroke="#ff0033"
              strokeWidth="1"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#diagonalPattern)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border border-[#ff0033]/20 rounded-xl p-6 text-center bg-gray-800/50 backdrop-blur-sm transition-all duration-500 hover:border-[#ff0033]/60 hover:shadow-lg hover:shadow-[#ff0033]/10 flex flex-col items-center relative"
            >
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-[#ff0033]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* SVG Icon */}
              {icons[index]}

              <div className="text-4xl md:text-5xl font-bold mb-2 text-[#ff0033]">
                {Math.floor(stat.value).toLocaleString()}
                {stat.label === "Win Rate %" && (
                  <span className="text-3xl">%</span>
                )}
              </div>
              <div className="text-gray-300 text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            className="inline-block bg-gradient-to-r from-[#ff0033] to-[#ff5e62] text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg shadow-[#ff0033]/30 hover:scale-105 duration-300 relative overflow-hidden transition animate-breathe"
            onClick={() => navigate("/packages")}
          >
            <span className="relative z-10">
              Join Our Winning Community Today!
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff0033] to-[#ff5e62] opacity-70 animate-pulse-slow rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
