"use client";

import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg text-slate-900">Modern Blog</span>
              <span className="text-[10px] text-slate-500 -mt-1">Daily Stories</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              Home
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              Articles
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              About Us
            </Link>
          </nav>

          {/* Subscribe Button */}
          <div className="hidden md:block">
            <button className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-slate-200">
            <Link href="/" className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg">
              Home
            </Link>
            <Link href="/" className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg">
              Articles
            </Link>
            <Link href="/" className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg">
              About Us
            </Link>
            <button className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg">
              Subscribe
            </button>
          </div>
        )}
      </div>
    </header>
  );
}