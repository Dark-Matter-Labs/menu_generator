import { NextRequest, NextResponse } from "next/server";
import { generateMenuPackPDF } from "@/lib/pdf/generateMenuPDF";
import { MenuData } from "@/types/menu";

export async function POST(request: NextRequest) {
  try {
    const menuData: MenuData[] = await request.json();
    
    // DEBUG: Log what the PDF generation is receiving
    console.log("=== PDF GENERATION RECEIVING ===");
    console.log(JSON.stringify(menuData, null, 2));
    console.log("=== END PDF DATA ===");
    
    if (!menuData || !Array.isArray(menuData)) {
      return NextResponse.json(
        { error: "Invalid menu data" },
        { status: 400 }
      );
    }

    const pdfBytes = await generateMenuPackPDF(menuData);
    
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=ai-generated-menus.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
} 