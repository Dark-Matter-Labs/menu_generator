import { MenuData } from "@/types/menu";

interface IngredientsSectionProps {
  menuData: MenuData[];
}

export default function IngredientsSection({
  menuData,
}: IngredientsSectionProps) {
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
    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Ingredients List
      </h2>

      <div className="space-y-8">
        {menuData.map((menu, index) => (
          <div key={index} className="space-y-4">
            {/* Menu Header */}
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor:
                    menuColors[menu.type as keyof typeof menuColors],
                }}
              ></div>
              <h3 className="text-lg font-semibold text-gray-800">
                {menu.type} - Ingredients for {menu.starter.name},{" "}
                {menu.main.name}, {menu.dessert.name}
              </h3>
            </div>

            {/* Ingredients Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      Ingredient
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      Quantity (grams)
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {menu.ingredients.map((ingredient, ingredientIndex) => (
                    <tr
                      key={ingredientIndex}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-800">
                        {ingredient.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                        {ingredient.grams}g
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                        {ingredient.category}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
