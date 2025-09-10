import HeroVideo from "./HeroVideo";

export default function ScrollSections() {
  return (
    <div className="relative">
      {/* Home Section - Fixed background */}
      <section id="home" className="fixed top-0 left-0 w-full h-screen  z-0">
        <HeroVideo />
      </section>

      {/* Section 1 - Slides up over the fixed hero */}
      <section id="section1" className="relative min-h-screen bg-red-500 flex items-center justify-center z-10" style={{ marginTop: '100vh' }}>
        <h2 className="text-6xl font-bold text-white">Section 1</h2>
      </section>

      {/* Section 2 - Slides up over Section 1 */}
      <section id="section2" className="relative min-h-screen bg-blue-500 flex items-center justify-center z-20" >
        <h2 className="text-6xl font-bold text-white">Section 2</h2>
      </section>

      {/* Section 3 - Slides up over Section 2 */}
      <section id="section3" className="relative min-h-screen bg-green-500 flex items-center justify-center z-30" >
        <h2 className="text-6xl font-bold text-white">Section 3</h2>
      </section>

      {/* Section 4 - Slides up over Section 3 */}
      <section id="section4" className="relative min-h-screen bg-purple-500 flex items-center justify-center z-40">
        <h2 className="text-6xl font-bold text-white">Section 4</h2>
      </section>
    </div>
  );
}
