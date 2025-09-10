"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, Variants, HTMLMotionProps } from "framer-motion";

export default function Section2() {
  const { scrollY } = useScroll();
  
  // Transform scroll position to animation progress (0-1)
  const animationProgress = useTransform(
    scrollY,
    [2340, 2800],
    [0, 1]
  );

  const line1 = "Regenerative";
  const line2 = "Food Future";
  const letters1 = Array.from(line1);
  const letters2 = Array.from(line2);
  const totalLetters = letters1.length + letters2.length;

  // Calculate which letters should be visible based on scroll progress
  const getLetterProgress = (index: number) => {
    const letterThreshold = (index + 1) / totalLetters;
    // Add a small buffer so letters don't appear too abruptly
    const startThreshold = Math.max(0, letterThreshold - 0.05);
    const endThreshold = letterThreshold;
    return useTransform(animationProgress, [startThreshold, endThreshold], [0, 1]);
  };

  return (
    <section
      id="section2"
      className="relative h-screen bg-transparent flex items-center justify-center z-20"
    >
      <div className="w-full mx-10 bg-[#B3B0A4F5] h-screen flex flex-col items-center justify-start pt-20">
        <div className="text-center">
          <h3 className="text-lg font-sans text-teal-500">Scenario 1</h3>
          <h2 className="text-4xl font-serif text-teal-500 leading-tight text-center">
            <div className="flex flex-col items-center">
              {/* First line: Regenerative */}
              <div className="flex justify-center">
                {letters1.map((letter, index) => {
                  const letterProgress = getLetterProgress(index);
                  return (
                    <motion.span 
                      key={index}
                      style={{
                        opacity: letterProgress,
                        y: useTransform(letterProgress, [0, 1], [20, 0])
                      }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </div>
              {/* Second line: Food Future */}
              <div className="flex justify-center">
                {letters2.map((letter, index) => {
                  const letterProgress = getLetterProgress(letters1.length + index);
                  return (
                    <motion.span 
                      key={letters1.length + index}
                      style={{
                        opacity: letterProgress,
                        y: useTransform(letterProgress, [0, 1], [20, 0])
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </h2>
          <div className="mt-8">
            <Image
              src="/Regen.png"
              alt="Regenerative Food Future"
              width={800}
              height={500}
              className="w-auto h-auto max-w-2xl mx-auto object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
