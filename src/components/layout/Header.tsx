interface HeaderProps {
  currentPage?: 'home' | 'chat' | 'results';
  onNavigateHome?: () => void;
}

export function Header({ currentPage = 'home', onNavigateHome }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onNavigateHome}
              className="text-xl font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              Soccer Scout
            </button>
            {currentPage !== 'home' && (
              <span className="text-gray-400">/</span>
            )}
            {currentPage === 'chat' && (
              <span className="text-gray-500 font-light">Analysis</span>
            )}
            {currentPage === 'results' && (
              <span className="text-gray-500 font-light">Results</span>
            )}
          </div>
          
          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {currentPage !== 'home' && (
              <button
                onClick={onNavigateHome}
                className="text-gray-600 hover:text-gray-900 transition-colors font-light"
              >
                ← Home
              </button>
            )}
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              About
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}