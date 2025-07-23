import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { MenuData } from "@/types/menu";
import fs from "fs";
import path from "path";

const menuColors: Record<MenuData["type"], [number, number, number]> = {
  FutureOne: [4, 157, 144],      // #049d90
  FutureTwo: [236, 146, 59],     // #ec923b
  FutureThree: [172, 36, 48],    // #ac2430
  FutureThreeB: [172, 36, 48],   // #ac2430
};

export async function generateMenuPDF(menu: MenuData): Promise<Uint8Array> {
  const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf'
  const fontBytes = await fetch(url).then(res => res.arrayBuffer())
  const boldUrl = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf'
  const boldFontBytes = await fetch(boldUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes)
  const boldFont = await pdfDoc.embedFont(boldFontBytes)
  await addMenuPage(pdfDoc, menu, customFont, boldFont);
  return await pdfDoc.save();
}

async function addMenuPage(pdfDoc: PDFDocument, menu: MenuData, font: any, boldFont: any) {
  const page = pdfDoc.addPage([595, 842]); // A4
  
  const colorArr = menuColors[menu.type];
  const textColor = rgb(colorArr[0]/255, colorArr[1]/255, colorArr[2]/255);

  // White background
  page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(1, 1, 1) });

  // Add logo to top right - using local file
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    const logoBuffer = fs.readFileSync(logoPath);
    const logoBytes = logoBuffer.buffer.slice(logoBuffer.byteOffset, logoBuffer.byteOffset + logoBuffer.byteLength);
    
    const logoImg = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImg.scale(30 / logoImg.height); // 30px tall (2x smaller)
    page.drawImage(logoImg, {
      x: 595 - logoDims.width - 40,
      y: 842 - logoDims.height - 40,
      width: logoDims.width,
      height: logoDims.height,
    });
  } catch (error) {
    console.log("Failed to embed logo:", error);
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
    
    // Underline (400px wide)
    page.drawLine({
      start: { x: leftMargin, y: y - 5 },
      end: { x: leftMargin + 400, y: y - 5 },
      thickness: 0.6,
      color: rgb(0, 0, 0),
    });
    
    y -= 50; // SPACING: Space after underline
    
    // Dish title (as provided in data) - BOLD
    const nameSize = 12;
    page.drawText(item.name, {
      x: leftMargin,
      y,
      size: nameSize,
      font: boldFont,
      color: textColor,
    });
    y -= 15; // SPACING: Space after dish name
    
    // Dish description (left-aligned) - shorter max length to match underline width
    const descSize = 12;
    const descLines = splitText(item.description, 50); // Increased from 35 to 50 characters
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
    
    y -= 10; // SPACING: Space after description (before served with)
    
    // Served with (asterisk) - also use shorter max length
    if (item.servedWith) {
      const servedLines = splitText(`* ${item.servedWith}`, 50); // Increased from 35 to 50 characters
      servedLines.forEach((line: string) => {
        page.drawText(line, {
          x: leftMargin,
          y,
          size: descSize,
          font,
          color: textColor,
        });
        y -= 15; // SPACING: Space after served with lines
      });
    }
    y -= 40; // SPACING: Space between courses
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
  const boldUrl = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-B.ttf'
  const boldFontBytes = await fetch(boldUrl).then(res => res.arrayBuffer())

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const customFont = await pdfDoc.embedFont(fontBytes)
  const boldFont = await pdfDoc.embedFont(boldFontBytes)
  
  for (const menu of menus) {
    await addMenuPage(pdfDoc, menu, customFont, boldFont);
  }
  return await pdfDoc.save();
} 