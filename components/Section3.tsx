export default function Section3() {
  return (
    <section
      id="section3"
      className="relative h-[100vh] bg-transparent flex items-center justify-center z-30"
    >
      <div className="w-full mx-10 bg-[#B3B0A4F5] h-[100vh] flex flex-col items-center justify-start pt-20">
        <div className="text-center">
          <h2 className="text-4xl font-serif text-[#382B20] mb-8">
            Section 3 Content
          </h2>
          <p className="text-lg text-[#382B20] max-w-2xl mx-auto">
            This is Section 3 with the same background styling as Section 1 and
            Section 2. You can add your content here.
          </p>
        </div>
      </div>
    </section>
  );
}
