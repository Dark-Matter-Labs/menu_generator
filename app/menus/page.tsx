"use client";

import { useState } from "react";
import MenuForm from "@/components/menu-generator/MenuForm";
import MenuSection from "@/components/menu-generator/MenuSection";
import Header from "@/components/Header";
import IngredientsSection from "@/components/menu-generator/IngredientsSection";
import FoodGroupSection from "@/components/menu-generator/FoodGroupSection";
import { MenuData } from "@/types/menu";

export default function MenusPage() {
  const [menuData, setMenuData] = useState<MenuData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('austria');

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setMenuData(null);

    // Extract location and convert to country ID for impact calculations
    const location = formData.get("location") as string;
    const countryId = location.toLowerCase(); // Convert "Austria" to "austria"
    setSelectedCountry(countryId);

    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received menu data:", data);
      console.log("Data type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      console.log("Length:", data?.length);
      setMenuData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate menus");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadGeneratedMenus = async () => {
    if (!menuData) return;

    console.log("Sending to PDF generation:", menuData);
    console.log("Menu data length:", menuData.length);

    setIsDownloading(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ai-generated-menus.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download AI-generated menus");
    } finally {
      setIsDownloading(false);
    }
  };
  console.log(menuData)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Header />
        <div className="grid grid-cols-1 gap-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8">
            <MenuForm onSubmit={handleFormSubmit} />
          </div>
          {menuData && (
            <MenuSection
              menuData={menuData}
              isDownloading={isDownloading}
              error={error}
              onDownload={handleDownloadGeneratedMenus}
            />
          )}

          {menuData && <IngredientsSection menuData={menuData} />}
          {menuData && <FoodGroupSection menuData={menuData} countryId={selectedCountry} />}
          
        </div>
      </div>
    </div>
  );
}
