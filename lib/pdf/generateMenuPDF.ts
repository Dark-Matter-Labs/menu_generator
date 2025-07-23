import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { MenuData } from "@/types/menu";

const menuColors: Record<MenuData["type"], [number, number, number]> = {
  FutureOne: [4, 157, 144],      // #049d90
  FutureTwo: [236, 146, 59],     // #ec923b
  FutureThree: [172, 36, 48],    // #ac2430
  FutureThreeB: [172, 36, 48],   // #ac2430
};

export async function generateMenuPDF(menu: MenuData): Promise<Uint8Array> {
  const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'
  const fontBytes = await fetch(url).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes)
  await addMenuPage(pdfDoc, menu, customFont);
  return await pdfDoc.save();
}

async function addMenuPage(pdfDoc: PDFDocument, menu: MenuData, font: any) {
  const page = pdfDoc.addPage([595, 842]); // A4
  
  const colorArr = menuColors[menu.type];
  const textColor = rgb(colorArr[0]/255, colorArr[1]/255, colorArr[2]/255);

  // White background
  page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(1, 1, 1) });

  // Add logo to top right
  const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/logo.png`;
  let logoBytes: Uint8Array | null = null;
  try {
    // Try to fetch the logo from the public directory
    const res = await fetch(logoUrl.startsWith("/") ? logoUrl : "/logo.png");
    if (res.ok) {
      logoBytes = new Uint8Array(await res.arrayBuffer());
    }
  } catch {}
  if (logoBytes) {
    try {
      const logoImg = await pdfDoc.embedPng(logoBytes);
      const logoDims = logoImg.scale(60 / logoImg.height); // 60px tall
      page.drawImage(logoImg, {
        x: 595 - logoDims.width - 40,
        y: 842 - logoDims.height - 40,
        width: logoDims.width,
        height: logoDims.height,
      });
    } catch {}
  }

  // Layout
  let y = 750; // SPACING: Starting Y position
  const pageWidth = 595;
  const leftMargin = 80;

  // Title (centered)
  const title = "FUTURE MENU";
  const titleSize = 12;
  const titleWidth = font.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (pageWidth - titleWidth) / 2,
    y,
    size: titleSize,
    font,
    color: textColor,
  });
  y -= 80; // SPACING: Space after title

  // Courses
  (["starter", "main", "dessert"] as const).forEach((course) => {
    const item = (menu as any)[course];
    if (!item) return;
    const courseLabel = course.toUpperCase();
    const courseSize = 12;
    
    // Course name (left-aligned)
    page.drawText(courseLabel, {
      x: leftMargin,
      y,
      size: courseSize,
      font,
      color: textColor,
    });
    
    y -= 15; // SPACING: Space between course name and underline
    
    // Underline (500px wide)
    page.drawLine({
      start: { x: leftMargin, y: y - 5 },
      end: { x: leftMargin + 400, y: y - 5 },
      thickness: 0.6,
      color: rgb(0, 0, 0),
    });
    
    y -= 50; // SPACING: Space after underline
    
    // Dish title (as provided in data)
    const nameSize = 12;
    page.drawText(item.name, {
      x: leftMargin,
      y,
      size: nameSize,
      font,
      color: textColor,
    });
    y -= 15; // SPACING: Space after dish name
    
    // Dish description (left-aligned)
    const descSize = 12;
    const descLines = splitText(item.description, 50);
    descLines.forEach((line: string) => {
      page.drawText(line, {
        x: leftMargin,
        y,
        size: descSize,
        font,
        color: textColor,
      });
      y -= 15; // SPACING: Space between description lines
    });
    
    y -= 30; // SPACING: Space after description (before served with)
    
    // Served with (asterisk)
    if (item.servedWith) {
      page.drawText(`* ${item.servedWith}`, {
        x: leftMargin,
        y,
        size: descSize,
        font,
        color: textColor,
      });
      y -= 15; // SPACING: Space after served with
    }
    y -= 50; // SPACING: Space between courses
  });
}

function splitText(text: string, maxLen: number) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + word).length > maxLen) {
      lines.push(line.trim());
      line = "";
    }
    line += word + " ";
  }
  if (line) lines.push(line.trim());
  return lines;
}

export async function generateMenuPackPDF(menus: MenuData[]): Promise<Uint8Array> {
  const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'
  const fontBytes = await fetch(url).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes)
  
  for (const menu of menus) {
    await addMenuPage(pdfDoc, menu, customFont);
  }
  return await pdfDoc.save();
} 