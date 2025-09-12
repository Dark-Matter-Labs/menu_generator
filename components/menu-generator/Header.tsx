export default function Header() {
  return (
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
  );
}
