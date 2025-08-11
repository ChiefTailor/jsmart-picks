import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const DiscordIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
    </svg>
  );

  return (
    <footer className="relative bg-black border-t border-white/10 pt-14 pb-8 overflow-hidden">
      {/* Gradient Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-[120px] opacity-20 animate-pulse-slow delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              J-Smart{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text">
                Picks
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              Premium Sports Picks • Accurate • Reliable
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { icon: <DiscordIcon />, href: "https://discord.gg/eU2E6xUf" },
              {
                icon: <Twitter size={20} />,
                href: "https://x.com/smart__picks_?s=21",
              },
              {
                icon: <Instagram size={20} />,
                href: "https://www.instagram.com/j_picks07?igsh=MTNlaGY0a2h1ZmI2YQ%3D%3D&utm_source=qr",
              },
            ].map(({ icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                className="p-2 rounded-full bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white transition-all shadow-lg"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-white/10"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} J-Smart Picks. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
