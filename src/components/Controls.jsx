import React, { useState, useEffect } from 'react';

export default function Controls({
  autoRotate,
  onAutoRotateToggle,
  onResetCamera,
  searchTerm,
  onSearchChange,
  countries,
  onCountrySelect,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => (prev + 1) % Math.min(countries.length, 10));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev === 0 ? Math.min(countries.length, 10) - 1 : prev - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (countries[highlightedIndex]) {
          onCountrySelect(countries[highlightedIndex]);
          setIsDropdownOpen(false);
          onSearchChange('');
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        break;
      default:
        break;
    }
  };

  const visibleCountries = countries.slice(0, 10);

  return (
    <div className="fixed top-8 left-8 z-40 space-y-4 max-w-md">
      {/* Top Control Bar */}
      <div className="glass rounded-xl p-4 flex gap-3 items-center shadow-lg animate-slide-in-left">
        {/* Auto-Rotate Toggle */}
        <button
          onClick={onAutoRotateToggle}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
            autoRotate
              ? 'bg-neon-cyan text-black shadow-lg shadow-neon-cyan/50 hover:shadow-neon-cyan/70'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          }`}
          aria-label={autoRotate ? 'Disable auto-rotation' : 'Enable auto-rotation'}
        >
          <span className="text-lg">{autoRotate ? '⟳' : '⏸'}</span>
          <span className="hidden sm:inline">
            {autoRotate ? 'On' : 'Off'}
          </span>
        </button>

        {/* Reset Camera Button */}
        <button
          onClick={onResetCamera}
          className="px-4 py-2 rounded-lg font-semibold bg-gray-700 text-gray-200 hover:bg-gray-600 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
          aria-label="Reset camera to Earth overview"
        >
          <span className="text-lg">🏠</span>
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Search & Country Dropdown */}
      <div className="glass rounded-xl p-4 shadow-lg w-full animate-slide-in-left">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
          🔍 Search Countries
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type country name..."
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/50 transition-all"
            aria-label="Search for countries"
            autocomplete="off"
          />

          {/* Dropdown Menu */}
          {isDropdownOpen && visibleCountries.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-h-64 overflow-y-auto z-50">
              {visibleCountries.map((country, index) => (
                <button
                  key={country.id}
                  onClick={() => {
                    onCountrySelect(country);
                    setIsDropdownOpen(false);
                    onSearchChange('');
                  }}
                  className={`w-full px-4 py-3 text-left transition-all border-b border-gray-800 last:border-b-0 flex items-center gap-3 ${
                    index === highlightedIndex
                      ? 'bg-gray-800 text-neon-cyan'
                      : 'hover:bg-gray-800 text-white'
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{country.name}</p>
                    <p className="text-xs text-gray-400">{country.continent}</p>
                  </div>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                    {country.id}
                  </span>
                </button>
              ))}
            </div>
          )}

          {isDropdownOpen && searchTerm && visibleCountries.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg p-4 text-center text-gray-400 text-sm z-50">
              No countries found
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          📊 {countries.length} / {20} countries found
        </p>
      </div>

      {/* Instructions Panel */}
      <div className="glass rounded-xl p-4 text-xs text-gray-300 space-y-2 w-full animate-slide-in-left">
        <p className="font-semibold text-neon-cyan mb-3">💡 How to Use</p>
        <div className="space-y-1.5">
          <p className="flex items-start gap-2">
            <span className="text-sm">🖱️</span>
            <span><span className="text-gray-400 font-semibold">Drag</span> to rotate globe 360°</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-sm">🔍</span>
            <span><span className="text-gray-400 font-semibold">Scroll</span> to zoom in/out</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-sm">🎯</span>
            <span><span className="text-gray-400 font-semibold">Click</span> countries to select</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-sm">📱</span>
            <span><span className="text-gray-400 font-semibold">Touch</span> pan on mobile</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-sm">⌨️</span>
            <span><span className="text-gray-400 font-semibold">Arrow keys</span> to navigate search</span>
          </p>
        </div>
      </div>
    </div>
  );
}
