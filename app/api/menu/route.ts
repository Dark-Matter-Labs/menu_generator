import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { location, season, guests, context } = await req.json();

  // Dummy menu data using form values
  const menu = {
    starter: {
      name: `Seasonal ${season} Salad (${location})`,
      ingredients: [
        { item: "Mixed greens", quantity: `${guests * 30}g` },
        { item: "Radishes", quantity: `${guests * 2} pcs` },
        { item: "Lemon vinaigrette", quantity: `${guests * 10}ml` },
      ],
      instructions: `Toss greens and radishes with vinaigrette. Serve chilled. Context: ${context}`,
      impact: { co2e: 0.2, water: 50, land: 0.05, nitrogen: 0.01, phosphorus: 0.002 },
    },
    main: {
      name: `Hearty ${location} Vegetable Stew`,
      ingredients: [
        { item: "Root vegetables", quantity: `${guests * 100}g` },
        { item: "Beans", quantity: `${guests * 50}g` },
        { item: "Herbs", quantity: `${guests * 5}g` },
      ],
      instructions: `Simmer all ingredients until tender. Serve hot. Context: ${context}`,
      impact: { co2e: 0.5, water: 120, land: 0.1, nitrogen: 0.02, phosphorus: 0.004 },
    },
    dessert: {
      name: `Fresh Fruit Medley (${season})`,
      ingredients: [
        { item: "Seasonal fruits", quantity: `${guests * 80}g` },
        { item: "Mint", quantity: `${guests * 1}g` },
      ],
      instructions: `Chop fruits, mix with mint, and chill before serving. Context: ${context}`,
      impact: { co2e: 0.1, water: 30, land: 0.02, nitrogen: 0.005, phosphorus: 0.001 },
    },
  };

  return NextResponse.json(menu);
} 