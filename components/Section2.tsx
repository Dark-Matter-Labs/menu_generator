"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import {ScrollAnimatedText} from "./ScrollAnimatedText";

export default function Section2() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll position variables (in pixels)
  const scenario1Start = 2400;
  const scenario1End = 3200;
  const scenario1FadeInEnd = 2700; // 300px fade in
  const scenario1FadeOutStart = 2900; // 300px fade out
  
  const text1Start = 2400;
  const text1End = 3100;
  const text2Start = 2550;
  const text2End = 3250;
  
  const imageStart = 2400;
  const imageEnd = 3250;
  const imageFadeInEnd = 2700; // 300px fade in
  const imageFadeOutStart = 2900; // 300px fade out


  const text3Start = 2950;
  const text3End = 3650;
  const text4Start = 3100;
  const text4End = 3850;
  
  // Custom scroll progress for Scenario 1
  const scenario1Progress = useMotionValue(0);
  const imageProgress = useMotionValue(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scenario1ProgressValue = Math.max(0, Math.min(1, (scrollY - scenario1Start) / (scenario1End - scenario1Start)));
      const imageProgressValue = Math.max(0, Math.min(1, (scrollY - imageStart) / (imageEnd - imageStart)));
      
      scenario1Progress.set(scenario1ProgressValue);
      imageProgress.set(imageProgressValue);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scenario1Start, scenario1End, scenario1Progress, imageStart, imageEnd, imageProgress]);
  
  // Log current scroll position
  useEffect(() => {
    const handleScroll = () => {
      console.log('Current scroll position:', window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      id="section2"
      className="relative h-[400vh] bg-transparent flex items-center justify-center z-20"
    >
      <div className="w-full mx-10 bg-[#B3B0A4F5] h-[400vh] flex flex-col items-center justify-start pt-20">
        <div className="text-center sticky top-40">
          <motion.h3 
            className="text-lg font-sans text-teal-500 mb-3"
            style={{
              opacity: useTransform(
                scenario1Progress, 
                [0, (scenario1FadeInEnd - scenario1Start) / (scenario1End - scenario1Start), (scenario1FadeOutStart - scenario1Start) / (scenario1End - scenario1Start), 1], 
                [0, 1, 1, 0]
              ),
              y: useTransform(scenario1Progress, [0, (scenario1FadeInEnd - scenario1Start) / (scenario1End - scenario1Start)], [20, 0])
            }}
          >
            Scenario 1
          </motion.h3>
          
          <div className="relative flex justify-center">
            <ScrollAnimatedText 
              text="Regenerative" 
              startScroll={text1Start}
              endScroll={text1End}
              className="text-teal-500 absolute"
            />
            
            <ScrollAnimatedText 
              text="Business-as-usual" 
              startScroll={text3Start}
              endScroll={text3End}
              className="text-purple-500 absolute"
            />
          </div>
          <div className="relative flex justify-center">
            <ScrollAnimatedText 
              text="Food Future" 
              startScroll={text2Start}
              endScroll={text2End}
              className="text-teal-500 absolute top-12"
            />
           
            <ScrollAnimatedText 
              text="Degenerative Future" 
              startScroll={text4Start}
              endScroll={text4End}
              className="text-purple-500 absolute top-12"
            />
          </div>
          <motion.div 
            className="mt-20"
            style={{
              opacity: useTransform(
                imageProgress, 
                [0, (imageFadeInEnd - imageStart) / (imageEnd - imageStart), (imageFadeOutStart - imageStart) / (imageEnd - imageStart), 1], 
                [0, 1, 1, 0]
              ),
              y: useTransform(imageProgress, [0, (imageFadeInEnd - imageStart) / (imageEnd - imageStart)], [30, 0])
            }}
          >
            <Image
              src="/Regen.png"
              alt="Regenerative Food Future"
              width={800}
              height={500}
              className="w-auto h-auto max-w-2xl mx-auto object-cover object-top"
            />
          </motion.div>
          
         
        </div>
      </div>
    </section>
  );
}
