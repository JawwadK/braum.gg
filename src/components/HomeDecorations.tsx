"use client";

import { motion } from "framer-motion";

export const HomeDecorations = () => {
  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0" style={{ zIndex: -2 }}>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated Elements */}
      <div className="fixed inset-0" style={{ zIndex: -1 }}>
        {/* Glowing orbs */}
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Snowflakes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: -20,
            }}
            animate={{
              y: ["0vh", "100vh"],
              x: [
                `${Math.random() * 20 - 10}px`,
                `${Math.random() * 20 - 10}px`,
              ],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * -0.2,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary/30"
            >
              <path d="M12 2L14 7L12 12L10 7L12 2Z" fill="currentColor" />
              <path d="M12 12L14 17L12 22L10 17L12 12Z" fill="currentColor" />
              <path d="M2 12L7 14L12 12L7 10L2 12Z" fill="currentColor" />
              <path d="M12 12L17 14L22 12L17 10L12 12Z" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </motion.div>
        ))}

        {/* Side crystals */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`crystal-${i}`}
            className="absolute w-16 h-32 bg-primary/5 rounded-full blur-xl"
            style={{
              left: `${i * 25}%`,
              top: "40%",
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </>
  );
};
