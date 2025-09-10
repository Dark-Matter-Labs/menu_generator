import Image from "next/image";

export default function Section1() {
  return (
    <section
      id="section1"
      className="relative h-[200vh] bg-transparent flex items-center justify-center z-10"
    >
       <div className="w-full mx-10 bg-[#B3B0A4F5] rounded-t-full h-[200vh] flex flex-col items-start pt-80 justify-center">
        <div className="flex flex-row items-center justify-center gap-x-20 w-full mx-10">
            <div className="basis-1/2 flex items-center justify-center">
          <h2 className="text-3xl text-center max-w-2xs font-serif text-[#382B20]">
            <span className="font-bold">Platform</span> for dialogue on{" "}
            <span className="font-bold">Local Food</span> System{" "}
            <span className="font-bold">Resilience</span>
          </h2>
          </div>
          <div className="basis-1/2 font-roboto text-[#382B20] flex flex-col items-start justify-center">
          <div className="max-w-md">
            <h3 className="font-bold font-serif text-2xl mb-4">What?</h3>
            <p className="mb-4">
              Digesting the Future is an immersive dining event that allows one
              to experience how different possible, plausible, or preferable
              futures might taste, smell, feel, or sound.
            </p>
            <p className="mb-4">
              Each scenario, and each course invites us to reflect on the values
              and choices that shape current food systems, discuss where these
              may lead us to, and confront, often, uncomfortable futures.
            </p>
            <p>Anything from a </p>
            <ul className="list-disc list-outside ml-8">
              <li>a nutrient-rich, local, fresh, and tasty feast</li>
              <li>
                nutrient-rich, local, fresh, and tasty feast, through
                business-as-usual monocrop, processed foods, up to a
              </li>
              <li>
                4-degree warming, food scarcity, and synthetic food
                replacementsmay land on your plate.
              </li>
            </ul>
          </div>
          </div>
        </div>
          <div className="w-full px-20 mt-30 relative">
            <Image
              src="/section1image.jpg"
              alt="Section 1 Image"
              width={800}
              height={600}
              className="w-full h-auto rounded-[150px]"
            />
            {/* Gradient overlay for fade effect */}
             <div className="absolute -bottom-[0.2px] left-0 right-0 h-1/2 bg-gradient-to-t from-[#B3B0A4F5] to-transparent rounded-b-[150px] mx-20"></div>
            <div className="absolute bottom-10 left-42 text-blue-200 z-10">
              <div className="text-3xl text-stone-600 font-serif font-bold">Brussels</div>
              <div className="text-sm"><span className="font-bold">Location:</span> Brussels</div>
              <div className="text-sm"><span className="font-bold">Modality:</span> Climate Futures</div>
              <div className="text-sm"><span className="font-bold">People:</span> 70</div>
            </div>
          </div>
      </div>
    </section>
  );
}
