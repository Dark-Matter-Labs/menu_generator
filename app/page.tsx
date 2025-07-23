"use client";

import { useState } from "react";
import MenuForm from "@/components/MenuForm";
import GeneratedMenu from "@/components/GeneratedMenu";
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
      setMenuData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate menus");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadStaticPack = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/test-menu-pack");
      if (!response.ok) {
        throw new Error("Failed to download PDF pack");
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "future-menu-pack.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download PDF pack");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Future Menu Generator
          </h1>
          <p className="text-lg text-gray-600">
            Generate menus for different future scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <MenuForm onSubmit={handleFormSubmit} />
          </div>
          
          <div>
            <div className="mb-4">
              <button
                onClick={handleDownloadStaticPack}
                disabled={isDownloading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                {isDownloading ? "Downloading..." : "Download Static PDF Pack"}
              </button>
            </div>
            
            <GeneratedMenu 
              menuData={menuData}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
