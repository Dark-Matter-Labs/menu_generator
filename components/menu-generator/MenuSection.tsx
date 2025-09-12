import { MenuData } from "@/types/menu";
import MenuDisplay from "@/components/menu-generator/MenuDisplay";
import DownloadSection from "@/components/DownloadSection";

interface MenuSectionProps {
  menuData: MenuData[] | null;
  isDownloading: boolean;
  error: string | null;
  onDownload: () => void;
}

export default function MenuSection({
  menuData,
  isDownloading,
  error,
  onDownload,
}: MenuSectionProps) {
  if (!menuData && !error) {
    return null;
  }

  return (
    <div className="">
      {/* Menu Display */}
      {menuData && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 px-10 py-10 grid grid-cols-1 gap-12">
          <h2 className="text-2xl font-bold place-self-center">
            Your dinner kit
          </h2>
          <MenuDisplay menuData={menuData} />
          <DownloadSection
            menuData={menuData}
            isDownloading={isDownloading}
            error={error}
            onDownload={onDownload}
          />
        </div>
      )}
    </div>
  );
}
