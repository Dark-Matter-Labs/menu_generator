import { MenuData } from "@/types/menu";
import Image from "next/image";

interface MenuDisplayProps {
  menuData: MenuData[] | null;
}

export default function MenuDisplay({ menuData }: MenuDisplayProps) {
  if (!menuData || menuData.length === 0) {
    return null;
  }

  const menuColors = {
    FutureOne: "#049d90",
    FutureTwo: "#ec923b",
    FutureThree: "#ac2430",
    FutureThreeB: "#ac2430",
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto max-h-[80vh] overflow-y-auto no-scrollbar">
      {menuData.map((menu, index) => (
        <div key={index} className="relative">
          {/* A4 Container */}
          <div
            className="mx-auto bg-white border-2 border-gray-400"
            style={{
              width: "210mm",
              height: "297mm",
              maxWidth: "100%",
              maxHeight: "80vh",
              aspectRatio: "210/297",
            }}
          >
            {/* Menu Content */}
            <div className="p-12 h-full flex flex-col">
              {/* Header with Logo */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1"></div>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <div className="text-center mb-12">
                <h1
                  className="text-3xl font-bold uppercase tracking-wider"
                  style={{
                    color: menuColors[menu.type as keyof typeof menuColors],
                  }}
                >
                  Future Menu
                </h1>
              </div>

              {/* Menu Items */}
              <div className="flex-1 space-y-8">
                {/* Starter */}
                <div>
                  <div className="mb-4">
                    <h2
                      className="text-xl font-bold uppercase tracking-wide mb-2"
                      style={{
                        color: menuColors[menu.type as keyof typeof menuColors],
                      }}
                    >
                      Starter
                    </h2>
                    <div
                      className="border-b-2"
                      style={{
                        width: "400px",
                        borderColor:
                          menuColors[menu.type as keyof typeof menuColors],
                      }}
                    ></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg capitalize">
                      {menu.starter.name}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {menu.starter.description}
                    </p>
                    {menu.starter.servedWith && (
                      <p className="text-gray-600 text-sm italic">
                        * {menu.starter.servedWith}
                      </p>
                    )}
                  </div>
                </div>

                {/* Main */}
                <div>
                  <div className="mb-4">
                    <h2
                      className="text-xl font-bold uppercase tracking-wide mb-2"
                      style={{
                        color: menuColors[menu.type as keyof typeof menuColors],
                      }}
                    >
                      Main
                    </h2>
                    <div
                      className="border-b-2"
                      style={{
                        width: "400px",
                        borderColor:
                          menuColors[menu.type as keyof typeof menuColors],
                      }}
                    ></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg capitalize">
                      {menu.main.name}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {menu.main.description}
                    </p>
                    {menu.main.servedWith && (
                      <p className="text-gray-600 text-sm italic">
                        * {menu.main.servedWith}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dessert */}
                <div>
                  <div className="mb-4">
                    <h2
                      className="text-xl font-bold uppercase tracking-wide mb-2"
                      style={{
                        color: menuColors[menu.type as keyof typeof menuColors],
                      }}
                    >
                      Dessert
                    </h2>
                    <div
                      className="border-b-2"
                      style={{
                        width: "400px",
                        borderColor:
                          menuColors[menu.type as keyof typeof menuColors],
                      }}
                    ></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg capitalize">
                      {menu.dessert.name}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {menu.dessert.description}
                    </p>
                    {menu.dessert.servedWith && (
                      <p className="text-gray-600 text-sm italic">
                        * {menu.dessert.servedWith}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Indicator */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              Menu {index + 1} of {menuData.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
