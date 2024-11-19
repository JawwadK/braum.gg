"use client";

import { motion } from "framer-motion";

export const IceDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Ice crystals */}
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="ice-pattern"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M25,0 L50,25 L25,50 L0,25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary/5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ice-pattern)" />
      </svg>

      {/* Floating ice shards */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 rounded-full bg-primary/10 backdrop-blur-sm"
          initial={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: 0,
            rotate: Math.random() * 360,
          }}
          animate={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            scale: [0.8, 1.2, 0.8],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export const BraumShield = () => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24 relative"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
        />
        <path
          d="M12 6L16 10L12 14L8 10L12 6Z"
          className="fill-primary stroke-primary"
          strokeWidth="2"
        />
        <path
          d="M12 14L16 18H8L12 14Z"
          className="fill-primary stroke-primary"
          strokeWidth="2"
        />
      </svg>
    </motion.div>
  );
};
