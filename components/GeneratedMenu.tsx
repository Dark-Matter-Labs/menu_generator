import { MenuData } from "@/types/menu";

interface GeneratedMenuProps {
  menuData: MenuData[] | null;
  isLoading: boolean;
  error: string | null;
}

export default function GeneratedMenu({ menuData, isLoading, error }: GeneratedMenuProps) {
  if (isLoading) {
    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Generating Menus...</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!menuData) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Generated Menus (JSON)</h2>
      <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
        <pre className="text-sm text-gray-800 whitespace-pre-wrap">
          {JSON.stringify(menuData, null, 2)}
        </pre>
      </div>
    </div>
  );
} 