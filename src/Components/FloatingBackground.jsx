import { motion } from "framer-motion";

const shapes = Array.from({ length: 30 }); // more shapes for liveliness

export default function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((_, i) => {
        const size = Math.random() * 80 + 20; // bigger shapes: 20–100px
        const startX = Math.random() * 100; // random horizontal start
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 10; // 10–25s

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 blur-sm" // brighter (20% white)
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              bottom: `-${size}px`,
            }}
            animate={{
              y: [-50, -window.innerHeight - size],
              x: [0, Math.random() * 200 - 100], // drifting sideways
              opacity: [0.4, 0.8, 0.4], // stronger fade
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
