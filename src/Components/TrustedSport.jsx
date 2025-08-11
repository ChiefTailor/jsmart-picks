import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const sportsbooks = [
  { name: "FanDuel", logo: "/fanduel.jpeg", url: "https://fanduel.com/" },
  {
    name: "PrizePicks",
    logo: "/prizepicks.jpeg",
    url: "https://www.prizepicks.com/",
  },
  { name: "Fanatics", logo: "/fanatics.jpeg", url: "https://fanatics.com/" },
  { name: "bet365", logo: "/bet365.png", url: "https://www.bet365.com/" },
  {
    name: "DraftKings",
    logo: "/draftkings.jpeg",
    url: "https://www.draftkings.com/",
  },
  { name: "ESPN BET", logo: "/espn-bets.jpeg", url: "https://espnbet.com/" },
];

export default function TrustedSportsbooks() {
  return (
    <section className="bg-black py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff2c40] text-center">
          Bet Smarter with Our Expert Site Reviews
        </h2>
        <p className="text-gray-400 text-center mt-2">
          We dig deep into odds, payouts, and user experiences so you play where
          it truly pays.
        </p>

        <ul className="mt-10">
          {sportsbooks.map((sb, index) => (
            <li key={index} className="relative group">
              <a
                href={sb.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 relative overflow-hidden transition-colors duration-200 hover:bg-[#1a1a1a]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={sb.logo}
                    alt={sb.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-white font-medium">{sb.name}</span>
                </div>
                <ExternalLink
                  size={20}
                  className="text-gray-500 group-hover:text-[#ff2c40]"
                />

                {/* Red underline animation */}
                <span className="absolute bottom-0 left-0 h-[2px] bg-[#ff2c40] w-0 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-gray-200 mb-6">
          Join Our Community Today
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          Get access to premium picks, expert analysis, and exclusive content
          across all platforms. Connect with fellow sports enthusiasts and
          elevate your betting strategy.
        </p>

        <motion.div
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" }}
        >
          <a
            href="/packages"
            className="px-8 py-4 bg-gradient-to-r from-[#ff0033] to-[#ff5e62]  rounded-lg text-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50  text-white transition animate-breathe"
          >
            Get Started
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
