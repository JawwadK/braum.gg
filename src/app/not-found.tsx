"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HomeIcon, ShieldQuestion } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative">
      {/* Background effects */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
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

      <div className="relative z-10 text-center px-4">
        {/* Shield Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              <ShieldQuestion className="w-32 h-32 text-primary/20" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary/40">
              404
            </div>
          </div>
        </motion.div>

        {/* Error message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold text-foreground">
            The Heart of the Freljord Cannot Find This Page
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            "Sometimes icy path leads nowhere.
            <br />
            Let Braum guide you back to safety!"
          </p>
        </motion.div>

        {/* Return button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <Link
            href="/"
            className="relative inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-colors group"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="font-medium">Back to Safety</span>
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary/5"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </Link>
        </motion.div>

        {/* Ice crystals decoration */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-primary/10 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Bottom pattern */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(59, 130, 246, 0.1) 25%, transparent)",
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
    </div>
  );
};

export default NotFoundPage;
