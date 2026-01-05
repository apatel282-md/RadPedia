import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary-100 rounded-lg flex items-center justify-center text-white font-display font-bold text-lg shadow-lg shadow-brand-primary-100/20">
              R
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">
              RadPedia
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium text-brand-text-200 hover:text-brand-primary-200 transition-colors"
            >
              Calculators
            </a>
            <a
              href="#"
              className="text-sm font-medium text-brand-text-200 hover:text-brand-primary-200 transition-colors"
            >
              References
            </a>
            <a
              href="mailto:support@radpedia.com"
              className="bg-brand-primary-100 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-accent-200 transition-all shadow-md shadow-brand-primary-100/10"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
