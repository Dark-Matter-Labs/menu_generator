"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { ScrollAnimatedText } from "./ScrollAnimatedText";

// ----- Helpers -----
function makeScenario(start: number, duration = 800, fade = 300) {
  const end = start + duration;
  return {
    start,
    end,
    fadeInEnd: start + fade,
    fadeOutStart: end - fade,
  };
}

function makeText(
  scenarioStart: number,
  offsetStart: number,
  offsetEnd: number
) {
  return {
    start: scenarioStart + offsetStart,
    end: scenarioStart + offsetEnd,
  };
}

export default function Section2() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ----- Scenario 1 -----
  const scenario1 = makeScenario(2400);
  const text1 = makeText(scenario1.start, 0, 700); // 2400–3100
  const text2 = makeText(scenario1.start, 150, 850); // 2550–3250
  const image1 = { ...scenario1 }; // same as scenario

  // ----- Scenario 2 -----
  const scenario2 = makeScenario(2950);
  const text3 = makeText(scenario2.start, 0, 700); // 2950–3650
  const text4 = makeText(scenario2.start, 150, 900); // 3100–3850
  const image2 = { ...scenario2 };

  // ----- Motion Values -----
  const scenario1Progress = useMotionValue(0);
  const image1Progress = useMotionValue(0);
  const scenario2Progress = useMotionValue(0);
  const image2Progress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const calcProgress = (s: { start: number; end: number }) =>
        Math.max(0, Math.min(1, (scrollY - s.start) / (s.end - s.start)));

      scenario1Progress.set(calcProgress(scenario1));
      image1Progress.set(calcProgress(image1));
      scenario2Progress.set(calcProgress(scenario2));
      image2Progress.set(calcProgress(image2));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    scenario1,
    image1,
    scenario2,
    image2,
    scenario1Progress,
    image1Progress,
    scenario2Progress,
    image2Progress,
  ]);

  return (
    <section
      ref={containerRef}
      id="section2"
      className="relative h-[400vh] bg-transparent flex items-center justify-center z-20"
    >
      <div className="w-full mx-10 bg-[#B3B0A4F5] h-[400vh] flex flex-col items-center justify-start pt-20">
        <div className="text-center sticky top-40">
          {/* Scenario 1 & 2 - superposed */}
          <div className="relative flex justify-center">
            <motion.h3
              className="text-lg font-sans text-teal-500 mb-3 absolute -top-12 text-nowrap"
              style={{
                opacity: useTransform(
                  scenario1Progress,
                  [
                    0,
                    (scenario1.fadeInEnd - scenario1.start) /
                      (scenario1.end - scenario1.start),
                    (scenario1.fadeOutStart - scenario1.start) /
                      (scenario1.end - scenario1.start),
                    1,
                  ],
                  [0, 1, 1, 0]
                ),
                y: useTransform(
                  scenario1Progress,
                  [
                    0,
                    (scenario1.fadeInEnd - scenario1.start) /
                      (scenario1.end - scenario1.start),
                  ],
                  [20, 0]
                ),
              }}
            >
              Scenario 1
            </motion.h3>

            <motion.h3
              className="text-lg font-sans text-purple-500 mb-3 absolute -top-12 text-nowrap"
              style={{
                opacity: useTransform(
                  scenario2Progress,
                  [
                    0,
                    (scenario2.fadeInEnd - scenario2.start) /
                      (scenario2.end - scenario2.start),
                    (scenario2.fadeOutStart - scenario2.start) /
                      (scenario2.end - scenario2.start),
                    1,
                  ],
                  [0, 1, 1, 0]
                ),
                y: useTransform(
                  scenario2Progress,
                  [
                    0,
                    (scenario2.fadeInEnd - scenario2.start) /
                      (scenario2.end - scenario2.start),
                  ],
                  [20, 0]
                ),
              }}
            >
              Scenario 2
            </motion.h3>
          </div>

          <div className="relative flex justify-center">
            <ScrollAnimatedText
              text="Regenerative"
              startScroll={text1.start}
              endScroll={text1.end}
              className="text-teal-500 absolute"
            />
            <ScrollAnimatedText
              text="Business-as-usual"
              startScroll={text3.start}
              endScroll={text3.end}
              className="text-purple-500 absolute"
            />
          </div>

          <div className="relative flex justify-center">
            <ScrollAnimatedText
              text="Food Future"
              startScroll={text2.start}
              endScroll={text2.end}
              className="text-teal-500 absolute top-12"
            />
            <ScrollAnimatedText
              text="Degenerative Future"
              startScroll={text4.start}
              endScroll={text4.end}
              className="text-purple-500 absolute top-12"
            />
          </div>

          {/* Images 1 & 2 - superposed */}
          <div className="relative mt-40 flex justify-center">
            <motion.div
              className="absolute"
              style={{
                opacity: useTransform(
                  image1Progress,
                  [
                    0,
                    (image1.fadeInEnd - image1.start) /
                      (image1.end - image1.start),
                    (image1.fadeOutStart - image1.start) /
                      (image1.end - image1.start),
                    1,
                  ],
                  [0, 1, 1, 0]
                ),
              }}
            >
              <Image
                src="/tables/table-one.png"
                alt="Table One"
                width={800}
                height={500}
                className="w-auto h-auto max-w-2xl mx-auto object-cover object-top"
              />
            </motion.div>
            <motion.div
              className="absolute"
              style={{
                opacity: useTransform(
                  image2Progress,
                  [
                    0,
                    (image2.fadeInEnd - image2.start) /
                      (image2.end - image2.start),
                    (image2.fadeOutStart - image2.start) /
                      (image2.end - image2.start),
                    1,
                  ],
                  [0, 1, 1, 0]
                ),
              }}
            >
              <Image
                src="/tables/table-two.png"
                alt="Table Two"
                width={800}
                height={500}
                className="w-auto h-auto max-w-2xl mx-auto object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
