"use client";
import { useState } from "react";
import MenuForm from "../components/MenuForm";
import GeneratedMenu from "../components/GeneratedMenu";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
export default function Home() {
  const [form, setForm] = useState({
    location: "",
    season: "Spring",
    guests: 1,
    context: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menu, setMenu] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSeason = (value: string) => setForm({ ...form, season: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMenu(null);
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Unknown error");
      }
      const data = await res.json();
      setMenu(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  async function downloadPDF() {
    if (!menu) return;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const titleColor = rgb(80 / 255, 100 / 255, 120 / 255);
    const textColor = rgb(31 / 255, 31 / 255, 31 / 255);
    let y = 800;
    page.drawRectangle({ x: 0, y: 0, width: 595, height: 842, color: rgb(1, 218 / 255, 61 / 255), opacity: 0.08 });
    page.drawText("Menu Generator", {
      x: 40,
      y,
      size: 28,
      font,
      color: titleColor,
    });
    y -= 36;
    page.drawText(`Location: ${form.location} | Season: ${form.season} | Guests: ${form.guests}`, {
      x: 40,
      y,
      size: 12,
      font,
      color: textColor,
    });
    y -= 20;
    page.drawText(`Context & Goals: ${form.context}`, {
      x: 40,
      y,
      size: 12,
      font,
      color: textColor,
      maxWidth: 515,
    });
    y -= 30;
    ["starter", "main", "dessert"].forEach((course) => {
      const item = (menu as any)[course];
      if (!item) return;
      page.drawText(course.charAt(0).toUpperCase() + course.slice(1), {
        x: 40,
        y,
        size: 18,
        font,
        color: titleColor,
      });
      y -= 22;
      page.drawText(item.name, { x: 60, y, size: 14, font, color: textColor });
      y -= 18;
      page.drawText("Ingredients:", { x: 60, y, size: 12, font, color: textColor });
      y -= 14;
      item.ingredients.forEach((ing: any) => {
        page.drawText(`- ${ing.item}: ${ing.quantity}`, { x: 80, y, size: 11, font, color: textColor });
        y -= 12;
      });
      y -= 4;
      page.drawText("Instructions:", { x: 60, y, size: 12, font, color: textColor });
      y -= 14;
      const instrLines = splitText(item.instructions, 70);
      instrLines.forEach((line: string) => {
        page.drawText(line, { x: 80, y, size: 11, font, color: textColor });
        y -= 12;
      });
      y -= 4;
      page.drawText("Impact:", { x: 60, y, size: 12, font, color: textColor });
      y -= 14;
      const impact = item.impact;
      page.drawText(
        `CO2e: ${impact.co2e} kg, Water: ${impact.water} L, Land: ${impact.land} m², N: ${impact.nitrogen} kg, P: ${impact.phosphorus} kg`,
        { x: 80, y, size: 11, font, color: textColor }
      );
      y -= 24;
    });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "menu.pdf";
    a.click();
    URL.revokeObjectURL(url);
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

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-8 bg-gradient-to-r from-[#FFDA3D] to-[#EBE8DB] w-full">
      <MenuForm
        form={form}
        onChange={handleChange}
        onSeason={handleSeason}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error && <div className="text-red-400 mt-2">{error}</div>}
      {menu && (
        <GeneratedMenu menu={menu} form={form} onDownload={downloadPDF} />
      )}
    </main>
  );
}
