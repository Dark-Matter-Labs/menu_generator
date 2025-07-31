"use client";

import { useState } from "react";
import MenuForm from "@/components/MenuForm";
import MenuSection from "@/components/MenuSection";
import { MenuData } from "@/types/menu";

export default function Home() {
  const [menuData, setMenuData] = useState<MenuData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setMenuData(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              Future Menu Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Generate menus for different future scenarios - from regenerative
            agriculture to survival rations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Form Section */}
          <div className="grid grid-cols-1 gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8">
              <MenuForm onSubmit={handleFormSubmit} />
            </div>
          </div>
          {menuData && (
            <MenuSection
              menuData={menuData}
              isDownloading={isDownloading}
              error={error}
              onDownload={handleDownloadGeneratedMenus}
            />
          )}
        </div>
      </div>
    </div>
  );
}
