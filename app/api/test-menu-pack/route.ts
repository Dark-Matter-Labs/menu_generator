import { NextRequest } from "next/server";
import { generateMenuPackPDF } from "@/lib/pdf/generateMenuPDF";
import { MenuData } from "@/types/menu";

export async function GET(req: NextRequest) {
  const menus: MenuData[] = [
    {
      type: "FutureOne",
      starter: {
        name: "Fatoush",
        description: "Iceberg lettuce, red oak leaf lettuce, beetroot, pita chips, garlic, mint, flat leaf parsley, cherry tomatoes, cucumber, snow peas, pomegranate, radishes.",
        servedWith: "A glass of regenerative delight",
      },
      main: {
        name: "Fried Rice",
        description: "Fried rice, carrot, peas, sprouts, stuffed Chinese cabbage with seitan/lentils, pickled vegetables (kimchi style).",
        servedWith: "A glass of regenerative delight",
      },
      dessert: {
        name: "Belgian Strawberry Dream",
        description: "Belgian strawberries with mint and hazelnuts, whipped cream.",
        servedWith: "Coffee made from organic Fairtrade beans, carefully roasted to perfection. Alternative: Tea",
      },
    },
    {
      type: "FutureTwo",
      starter: {
        name: "Toast Deluxe",
        description: "A slice of soft white bread served with a generous amount of buttery margarine, perfect as a simple and classic side.",
        servedWith: "An energizing drink",
      },
      main: {
        name: "Macaroni & (Meat)balls",
        description: "Macaroni with veggie- or not-so-veggie meatballs, garlic bread and side salad.",
        servedWith: "A glass of coca cola",
      },
      dessert: {
        name: "Ice Cream Bomb",
        description: "Ice cream, topped with chocolate sauce and whipped cream.",
        servedWith: "A cup of instant coffee",
      },
    },
    {
      type: "FutureThree",
      starter: {
        name: "Nutrient Shot",
        description: "A powerful and nutrient-rich protein shot that provides an energy boost, nourishment and vitality.",
      },
      main: {
        name: "Macaroni in Broth",
        description: "A delicate and nutritious serving of whole wheat and white bean macaroni, served in a mild and flavorful broth.",
        servedWith: "A glass of purified water",
      },
      dessert: {
        name: "Nut-Paste",
        description: "Sweetened hazelnut paste.",
        servedWith: "A vitamin-infused sparkling drink.",
      },
    },
    {
      type: "FutureThreeB",
      starter: {
        name: "Nutrient Shot",
        description: "A powerful and nutrient-rich protein shot that provides an energy boost, nourishment and vitality.",
        servedWith: "+ Fresh vegetables",
      },
      main: {
        name: "Macaroni in Broth",
        description: "A delicate and nutritious serving of whole wheat and white bean macaroni, served in a mild and flavorful broth.",
        servedWith: "+ Sourdough bread",
      },
      dessert: {
        name: "Nut-Paste",
        description: "Sweetened hazelnut paste.",
        servedWith: "+ Nut-mix and an apple",
      },
    },
  ];
  const pdfBytes = await generateMenuPackPDF(menus);
  return new Response(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=menus.pdf",
    },
  });
} 