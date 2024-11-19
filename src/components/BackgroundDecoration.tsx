"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BackgroundDecoration = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Large circles */}
      <motion.div
        className="absolute top-20 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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
        className="absolute bottom-20 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/10)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/10)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background" />
    </div>
  );
};

export default BackgroundDecoration;
