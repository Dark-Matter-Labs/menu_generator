export default function Section3() {
  return (
    <section
      id="section3"
      className="relative h-[100vh] bg-transparent flex items-center justify-center z-30"
    >
      <div className="w-full mx-10 bg-[#B3B0A4F5] h-[100vh] flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-8">
          {/* Card 1: Climatic Futures */}
          <div className="bg-gray-200/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-[#382B20] font-semibold">
                Climatic Futures
              </h3>
            </div>
            <p className="text-[#382B20] mb-4 text-sm leading-relaxed">
              Different sections of the table experience distinct climatic
              realities, from regenerative abundance to extreme scarcity.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#382B20] mb-2">
                Experience Elements:
              </p>
              <ul className="text-xs text-[#382B20] space-y-1">
                <li>
                  I. Regenerative Scenario: Abundant, diverse, locally-sourced
                  meals
                </li>
                <li>
                  II. Business-as-Usual: Current systems with emerging
                  constraints
                </li>
                <li>
                  III. 4-Degree Extreme: Scarcity, substitutes, survival foods
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Socio-economic Realities */}
          <div className="bg-gray-200/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-[#382B20] font-semibold">
                Socio–economic Realities
              </h3>
            </div>
            <p className="text-[#382B20] mb-4 text-sm leading-relaxed">
              Experience how different communities within the same geography or
              city eat based on inequality and access.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#382B20] mb-2">
                Explore:
              </p>
              <ul className="text-xs text-[#382B20] space-y-1">
                <li>• Food environment variations across districts</li>
                <li>• Access barriers and food deserts</li>
                <li>• Cultural dietary practices and constraints</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Spatial Futures */}
          <div className="bg-gray-200/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-red-500 font-semibold">
                Spatial Futures
              </h3>
            </div>
            <p className="text-[#382B20] mb-4 text-sm leading-relaxed">
              Two contrasting visions: integrated food systems vs. separated
              conservation and production.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#382B20] mb-2">
                What&apos;s covered
              </p>
              <div className="text-xs text-[#382B20]">
                <p>Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
