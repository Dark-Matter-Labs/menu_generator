import HeroVideo from "../HeroVideo";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

export default function ScrollSections() {
  return (
    <div className="relative">
      {/* Home Section - Fixed background */}
      <section id="home" className="fixed top-0 left-0 w-full h-screen  z-0">
        <HeroVideo />
      </section>

      {/* Section 1 - Slides up over the fixed hero */}
      <div style={{ marginTop: "100vh" }}>
        <Section1 />
      </div>

      {/* Section 2 - Slides up over Section 1 */}
      <Section2 />

      {/* Section 3 - Slides up over Section 2 */}
      <Section3 />

      {/* Section 4 - Slides up over Section 3 */}
      <section
        id="section4"
        className="relative min-h-screen bg-purple-500 flex items-center justify-center z-40"
      >
        <h2 className="text-6xl font-bold text-white">Section 4</h2>
      </section>
    </div>
  );
}
