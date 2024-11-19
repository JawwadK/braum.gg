"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

export default function Navbar() {
  const [summonerName, setSummonerName] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (summonerName) {
      window.location.href = `/?search=${encodeURIComponent(summonerName)}`;
    }
  };

  return (
    <nav className="relative bg-background/80 backdrop-blur-sm border-b border-border">
      {/* Freljord-themed decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,theme(colors.primary/3)_25%,transparent_25%,transparent_75%,theme(colors.primary/3)_75%)] bg-[length:4px_4px]" />
        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Image
                src="/braum.png"
                alt="Braum.gg Logo"
                width={40}
                height={40}
                className="rounded-full relative border-2 border-primary/20 group-hover:border-primary/50 transition-colors"
                priority
              />
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-foreground font-bold text-lg">
                Braum.GG
              </span>
              <span className="text-xs text-primary/80 font-medium">
                Heart of the Freljord
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                value={summonerName}
                onChange={(e) => setSummonerName(e.target.value)}
                placeholder="Search summoner (Name#TAG)"
                className="w-full bg-card/50 text-foreground placeholder-muted-foreground rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-accent border border-border/50 transition-all"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
            </form>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/leaderboard">Leaderboard</NavLink>
            <NavLink href="/champions">Champions</NavLink>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="relative px-3 py-2 text-muted-foreground hover:text-foreground transition-colors group"
  >
    <span className="relative z-10">{children}</span>
    <motion.div
      className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  </Link>
);
