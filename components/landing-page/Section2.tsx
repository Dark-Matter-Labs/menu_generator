"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { ScrollAnimatedText } from "./ScrollAnimatedText";

// ----- Helpers -----
function makeScenario(
  start: number,
  duration = 800,
  fadeIn = 300,
  fadeOut = 300
) {
  const end = start + duration;
  return {
    start,
    end,
    fadeInEnd: start + fadeIn,
    fadeOutStart: end - fadeOut,
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
  const image1 = makeScenario(2400); // same as scenario

  // ----- Scenario 2 -----
  const scenario2 = makeScenario(2950);
  const text3 = makeText(scenario2.start, 0, 700); // 2950–3650
  const text4 = makeText(scenario2.start, 150, 900); // 3100–3850
  const image2 = makeScenario(2950);

  // ----- Scenario 3 -----
  const scenario3 = makeScenario(3500);
  const text5 = makeText(scenario3.start, 0, 800); // main headline
  const text6 = makeText(scenario3.start, 150, 1000); // subheadline
  const image3 = makeScenario(3500, 1200, 300, 100);

  // ----- Motion Values -----
  const scenario1Progress = useMotionValue(0);
  const image1Progress = useMotionValue(0);
  const scenario2Progress = useMotionValue(0);
  const image2Progress = useMotionValue(0);
  const scenario3Progress = useMotionValue(0);
  const image3Progress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log(scrollY);
      const calcProgress = (s: { start: number; end: number }) =>
        Math.max(0, Math.min(1, (scrollY - s.start) / (s.end - s.start)));

      scenario1Progress.set(calcProgress(scenario1));
      image1Progress.set(calcProgress(image1));
      scenario2Progress.set(calcProgress(scenario2));
      image2Progress.set(calcProgress(image2));
      scenario3Progress.set(calcProgress(scenario3));
      image3Progress.set(calcProgress(image3));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    scenario1,
    image1,
    scenario2,
    image2,
    scenario3,
    image3,
    scenario1Progress,
    image1Progress,
    scenario2Progress,
    image2Progress,
    scenario3Progress,
    image3Progress,
  ]);

  return (
    <section
      ref={containerRef}
      id="section2"
      className="relative h-[210vh] bg-transparent flex items-center justify-center z-20"
    >
      <div className="w-full mx-10 bg-[#B3B0A4F5] h-[210vh] flex flex-col items-center justify-start pt-20">
        <div className="text-center sticky top-40">
          {/* Scenario titles stacked */}
          <div className="relative flex justify-center">
            {/* Scenario 1 */}
            <motion.h3
              className="text-lg font-sans text-emerald-800 mb-3 absolute -top-12 text-nowrap"
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

            {/* Scenario 2 */}
            <motion.h3
              className="text-lg font-sans text-yellow-800 mb-3 absolute -top-12 text-nowrap"
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

            {/* Scenario 3 */}
            <motion.h3
              className="text-lg font-sans text-[#7A0000] mb-3 absolute -top-12 text-nowrap"
              style={{
                opacity: useTransform(
                  scenario3Progress,
                  [
                    0,
                    (scenario3.fadeInEnd - scenario3.start) /
                      (scenario3.end - scenario3.start),
                    (scenario3.fadeOutStart - scenario3.start) /
                      (scenario3.end - scenario3.start),
                    1,
                  ],
                  [0, 1, 1, 0]
                ),
                y: useTransform(
                  scenario3Progress,
                  [
                    0,
                    (scenario3.fadeInEnd - scenario3.start) /
                      (scenario3.end - scenario3.start),
                  ],
                  [20, 0]
                ),
              }}
            >
              Scenario 3
            </motion.h3>
          </div>

          {/* Text overlays */}
          <div className="relative flex justify-center">
            <ScrollAnimatedText
              text="Regenerative"
              startScroll={text1.start}
              endScroll={text1.end}
              className="text-emerald-800 absolute"
            />
            <ScrollAnimatedText
              text="Business-as-usual"
              startScroll={text3.start}
              endScroll={text3.end}
              className="text-yellow-800 absolute"
            />
            <ScrollAnimatedText
              text="4 degree"
              startScroll={text5.start}
              endScroll={text5.end}
              className="text-[#7A0000] absolute"
            />
          </div>

          <div className="relative flex justify-center">
            <ScrollAnimatedText
              text="Food Future"
              startScroll={text2.start}
              endScroll={text2.end}
              className="text-emerald-800 absolute top-12"
            />
            <ScrollAnimatedText
              text="Degenerative Future"
              startScroll={text4.start}
              endScroll={text4.end}
              className="text-yellow-800 absolute top-12"
            />
            <ScrollAnimatedText
              text="Climate Collapse"
              startScroll={text6.start}
              endScroll={text6.end}
              className="text-[#7A0000] absolute top-12"
            />
          </div>

          {/* Images stacked */}
          <div className="relative mt-40 flex justify-center">
            {/* Image 1 */}
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

            {/* Image 2 */}
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

            {/* Image 3 */}
            <motion.div
              className="absolute"
              style={{
                opacity: useTransform(
                  image3Progress,
                  [
                    0,
                    (image3.fadeInEnd - image3.start) /
                      (image3.end - image3.start),
                    (image3.fadeOutStart - image3.start) /
                      (image3.end - image3.start),
                    1,
                  ],
                  [0, 1, 1, 0]
                ),
              }}
            >
              <Image
                src="/tables/table-three.png"
                alt="Table Three"
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
