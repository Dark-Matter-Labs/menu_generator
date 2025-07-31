import { MenuData } from "@/types/menu";
import MenuDisplay from "@/components/MenuDisplay";
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
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 px-10 py-20 grid grid-cols-1 gap-12">
          
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
