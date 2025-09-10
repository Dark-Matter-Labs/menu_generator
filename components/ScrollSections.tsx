import HeroVideo from "./HeroVideo";

export default function ScrollSections() {
  return (
    <div className="relative">
      {/* Home Section */}
      <section id="home" className="min-h-screen -mt-20">
        <HeroVideo />
      </section>

      {/* Section 1 */}
      <section id="section1" className="min-h-screen bg-red-500 flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white">Section 1</h2>
      </section>

      {/* Section 2 */}
      <section id="section2" className="min-h-screen bg-blue-500 flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white">Section 2</h2>
      </section>

      {/* Section 3 */}
      <section id="section3" className="min-h-screen bg-green-500 flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white">Section 3</h2>
      </section>

      {/* Section 4 */}
      <section id="section4" className="min-h-screen bg-purple-500 flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white">Section 4</h2>
      </section>
    </div>
  );
}
