import { Button } from "./ui/button";

interface MenuItem {
  name: string;
  ingredients: { item: string; quantity: string }[];
  instructions: string;
  impact: {
    co2e: number;
    water: number;
    land: number;
    nitrogen: number;
    phosphorus: number;
  };
}

interface Menu {
  starter: MenuItem;
  main: MenuItem;
  dessert: MenuItem;
}

interface GeneratedMenuProps {
  menu: Menu;
  form: {
    location: string;
    season: string;
    guests: number;
    context: string;
  };
  onDownload: () => void;
}

export default function GeneratedMenu({ menu, form, onDownload }: GeneratedMenuProps) {
  return (
    <div className="mt-8 w-full max-w-2xl bg-[#EBE8DB] text-[#1f1f1f] rounded-lg shadow-lg p-8 border border-[#506478]">
      <h2 className="text-2xl font-bold text-[#506478] mb-4">Generated Menu</h2>
      <div className="mb-2 font-medium">Location: {form.location} | Season: {form.season} | Guests: {form.guests}</div>
      <div className="mb-4 italic">Context & Goals: {form.context}</div>
      {(["starter", "main", "dessert"] as const).map((course) => {
        const item = (menu as any)[course];
        if (!item) return null;
        return (
          <div key={course} className="mb-6">
            <div className="text-xl font-semibold text-[#506478] mb-1 capitalize">{course}</div>
            <div className="font-bold mb-1">{item.name}</div>
            <div className="mb-1">
              <span className="font-semibold">Ingredients:</span>
              <ul className="list-disc list-inside ml-4">
                {item.ingredients.map((ing: any, i: number) => (
                  <li key={i}>{ing.item}: {ing.quantity}</li>
                ))}
              </ul>
            </div>
            <div className="mb-1">
              <span className="font-semibold">Instructions:</span> {item.instructions}
            </div>
            <div>
              <span className="font-semibold">Impact:</span> CO2e: {item.impact.co2e} kg, Water: {item.impact.water} L, Land: {item.impact.land} m², N: {item.impact.nitrogen} kg, P: {item.impact.phosphorus} kg
            </div>
          </div>
        );
      })}
      <Button
        className="bg-[#506478] hover:bg-[#011426] text-[#aaaaaa] font-semibold mt-4"
        onClick={onDownload}
        type="button"
      >
        Download as PDF
      </Button>
    </div>
  );
} 