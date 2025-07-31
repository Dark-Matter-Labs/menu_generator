interface DownloadSectionProps {
  menuData: any[] | null;
  isDownloading: boolean;
  error: string | null;
  onDownload: () => void;
}

export default function DownloadSection({
  menuData,
  isDownloading,
  error,
  onDownload,
}: DownloadSectionProps) {
  return (
    <div className="flex justify-between items-center max-w-7xl mx-auto w-[210mm]">
      {/* Download Options */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Download Options
        </h2>
        <button
          onClick={onDownload}
          disabled={isDownloading || !menuData}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md"
        >
          {isDownloading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating PDF...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download AI-Generated Menus</span>
            </div>
          )}
        </button>
      </div>

      {/* Status Messages */}
      <div className="space-y-4">
        {error && (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-red-600">Error</h3>
              <p className="text-sm text-red-500">{error}</p>
            </div>
          </div>
        )}

        {menuData && !error && (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-emerald-600">
                Menus Generated Successfully
              </h3>
              <p className="text-sm text-emerald-500">
                {menuData.length} future scenario menus ready for download
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 