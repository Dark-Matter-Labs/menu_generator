"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

export default function HeroVideo() {
  const titleOpacity = useMotionValue(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Start fading out at 200px scroll
      const fadeStart = 200;
      const fadeEnd = 600; // Complete fade by 600px

      if (scrollY < fadeStart) {
        titleOpacity.set(1);
      } else if (scrollY > fadeEnd) {
        titleOpacity.set(0);
      } else {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        titleOpacity.set(1 - progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [titleOpacity]);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden -mt-0">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://cdn.prod.website-files.com/687a575d629ec719af0ffd2e%2F687a5914ebc0dee7255a46e7_UBNI%20High%20res%20version_2%20%281%29-transcode.webm"
            type="video/webm"
          />
          <source
            src="https://cdn.prod.website-files.com/687a575d629ec719af0ffd2e%2F687a5914ebc0dee7255a46e7_UBNI%20High%20res%20version_2%20%281%29-transcode.mp4"
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-amber-50 to-orange-100" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{ opacity: titleOpacity }}
      >
        <Image
          src="/hero-title.svg"
          alt="Digesting the Future"
          width={800}
          height={400}
          className="w-full max-w-4xl h-auto"
        />
      </motion.div>
    </div>
  );
}
