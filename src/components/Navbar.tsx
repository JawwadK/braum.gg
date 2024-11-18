"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [summonerName, setSummonerName] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (summonerName) {
      window.location.href = `/?search=${encodeURIComponent(summonerName)}`;
    }
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/braum.png"
                alt="Braum.gg Logo"
                width={40} // A bit larger than before but still reasonable for navbar
                height={40}
                className="rounded"
                priority
              />
              <span className="ml-2 text-white font-bold text-lg">
                Braum.gg
              </span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={summonerName}
                onChange={(e) => setSummonerName(e.target.value)}
                placeholder="Search summoner (Name#TAG)"
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-colors"
              />
            </form>
          </div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/leaderboard"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/champions"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Champions
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
