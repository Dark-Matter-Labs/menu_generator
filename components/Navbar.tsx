"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#FFDA3D] to-[#EBE8DB] shadow-md">
      <Link
        href="https://future-dinners.webflow.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-xl tracking-tight flex items-center gap-2 text-[#1f1f1f] hover:underline"
      >
        Menu Generator
      </Link>
    </nav>
  );
} 