"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [sectionProgress, setSectionProgress] = useState({
    home: 0,
    section1: 0,
    section2: 0,
    section3: 0,
    section4: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "section1", "section2", "section3", "section4"];
      const newProgress = { ...sectionProgress };

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const scrollPosition = window.scrollY;
          
          // Calculate progress through section (0 to 1)
          const progress = Math.max(0, Math.min(1, (scrollPosition - sectionTop) / sectionHeight));
          newProgress[sectionId as keyof typeof newProgress] = progress;
        }
      });

      setSectionProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionProgress]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="w-full sticky top-0 left-0 z-50 bg-transparent">
      <div className="w-full px-6 py-4">
        <div className="flex items-center w-full">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "home")}
            className="flex-1 text-center text-white font-semibold uppercase bg-black/40 hover:bg-black/60 transition-colors duration-200 py-3 rounded-sm mx-1"
          >
            UBNI
          </a>
          
          <a
            href="#section1"
            onClick={(e) => handleSmoothScroll(e, "section1")}
            className="flex-1 text-center text-white font-semibold uppercase py-3 rounded-sm mx-1 relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, 
                rgba(255, 255, 255, 0.9) ${sectionProgress.section1 * 100}%, 
                rgba(255, 255, 255, 0.2) ${sectionProgress.section1 * 100}%)`
            }}
          >
            Section 1
          </a>
          
          <a
            href="#section2"
            onClick={(e) => handleSmoothScroll(e, "section2")}
            className="flex-1 text-center text-white font-semibold uppercase py-3 rounded-sm mx-1 relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, 
                rgba(255, 255, 255, 0.9) ${sectionProgress.section2 * 100}%, 
                rgba(255, 255, 255, 0.2) ${sectionProgress.section2 * 100}%)`
            }}
          >
            Section 2
          </a>
          
          <a
            href="#section3"
            onClick={(e) => handleSmoothScroll(e, "section3")}
            className="flex-1 text-center text-white font-semibold uppercase py-3 rounded-sm mx-1 relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, 
                rgba(255, 255, 255, 0.9) ${sectionProgress.section3 * 100}%, 
                rgba(255, 255, 255, 0.2) ${sectionProgress.section3 * 100}%)`
            }}
          >
            Section 3
          </a>
          
          <a
            href="#section4"
            onClick={(e) => handleSmoothScroll(e, "section4")}
            className="flex-1 text-center text-white font-semibold uppercase py-3 rounded-sm mx-1 relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, 
                rgba(255, 255, 255, 0.9) ${sectionProgress.section4 * 100}%, 
                rgba(255, 255, 255, 0.2) ${sectionProgress.section4 * 100}%)`
            }}
          >
            Section 4
          </a>
          
          <Link
            href="/menus"
            className="flex-1 text-center text-white font-semibold uppercase bg-yellow-400 hover:bg-yellow-300 transition-colors duration-200 py-3 rounded-sm mx-1"
          >
            Menu Generator
          </Link>
        </div>
      </div>
    </nav>
  );
}
