import { NextRequest } from "next/server";
import { generateMenuPDF } from "@/lib/pdf/generateMenuPDF";
import { MenuData } from "@/types/menu";

export async function GET(req: NextRequest) {
  const menu: MenuData = {
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
      name: "Belgian strawberry dream",
      description: "Belgian strawberries with mint and hazelnuts, whipped cream.",
      servedWith: "Coffee made from organic Fairtrade beans, carefully roasted to perfection. Alternative: Tea",
    },
  };
  const pdfBytes = await generateMenuPDF(menu);
  return new Response(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=menu.pdf",
    },
  });
} 