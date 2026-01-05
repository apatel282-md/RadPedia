import { Link } from 'react-router-dom';

export default function Home() {
  const calculators = [
    {
      path: '/liver-spleen',
      title: 'Liver & Spleen',
      description: 'Pediatric organ length reference by age and height.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h4l2-5 4 10 2-5h4" />
        </svg>
      ),
    },
    {
      path: '/leg-length',
      title: 'Leg Length',
      description: 'Calculate limb discrepancy and segment measurements.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M7 6v4M11 6v4M15 6v4M19 6v4" />
        </svg>
      ),
    },
    {
      path: '/for-ratio',
      title: 'FOR Horn Ratio',
      description: 'Fronto-occipital horn ratio analysis.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3v18h18" />
          <path d="M7 14l3-3 3 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Radiology Reference & Calculators
          </h1>
          <p className="text-lg text-brand-text-200">
            Fast, reliable clinical tools for diagnostic imaging.
          </p>
        </div>

        {/* Tool Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link
              key={calc.path}
              to={calc.path}
              className="bg-brand-bg-200 p-8 rounded-3xl border border-white/5 transition-all hover:bg-brand-bg-300 hover:border-brand-primary-100/30 group"
            >
              <div className="w-12 h-12 bg-brand-primary-100/10 text-brand-primary-200 rounded-2xl flex items-center justify-center mb-6">
                {calc.icon}
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">
                {calc.title}
              </h2>
              <p className="text-brand-text-200 text-sm">{calc.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
