import { Header } from '../layout/Header';

interface HomePageProps {
  onStartAnalysis: (prefilledQuery?: string) => void;
}

export function HomePage({ onStartAnalysis }: HomePageProps) {
  const exampleQueries = [
    "Who can play alongside Kobbie Mainoo in Ligue 1?",
    "Find an alternative to Rodri for Manchester City's system",
    "Compare Haaland vs Mbappé across all metrics",
    "Who are the most undervalued center-backs in Serie A?"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="home" />
      
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section - Typography First */}
        <section className="mb-24">
          <h1 className="text-5xl font-light text-gray-900 leading-tight mb-8">
            AI-Powered Soccer
            <br />
            <span className="font-normal">Intelligence</span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl">
            Advanced player analysis using artificial intelligence to uncover 
            tactical insights, compare performances, and discover hidden gems 
            across European football.
          </p>
          
          <button
            onClick={() => onStartAnalysis()}
            className="bg-gray-900 text-white px-8 py-4 text-lg font-light hover:bg-gray-800 transition-colors"
          >
            Start Analysis →
          </button>
        </section>
        
        {/* Capabilities Section */}
        <section className="grid md:grid-cols-3 gap-12 mb-24">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tactical Analysis
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Deep tactical insights using comprehensive player data across 
              multiple dimensions of performance.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Player Comparison
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Compare players across leagues using advanced metrics and 
              AI-powered similarity analysis.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Market Intelligence
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Identify undervalued talents and market opportunities with 
              data-driven recommendations.
            </p>
          </div>
        </section>
        
        {/* Example Queries */}
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8">
            Example Queries
          </h2>
          
          <div className="space-y-4">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => onStartAnalysis(query)}
                className="block w-full text-left p-6 border border-gray-200 hover:border-gray-300 transition-colors text-gray-700 hover:text-gray-900"
              >
                "{query}"
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}