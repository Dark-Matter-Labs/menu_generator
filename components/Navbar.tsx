"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="https://future-dinners.webflow.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-800 hover:text-emerald-600 transition-colors duration-200"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">UB</span>
            </div>
            <span className="font-semibold text-lg">UBNI</span>
          </Link>

          <div className="text-sm text-gray-500">Future Menu Generator</div>
        </div>
      </div>
    </nav>
  );
}
