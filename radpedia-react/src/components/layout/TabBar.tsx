import { Link, useLocation } from 'react-router-dom';

export default function TabBar() {
  const location = useLocation();

  const tabs = [
    {
      path: '/',
      label: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      path: '/liver-spleen',
      label: 'Liver/Spleen',
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
      label: 'Leg Length',
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
      label: 'FOR Ratio',
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
    <nav className="ios-tab-bar">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`ios-tab-item ${location.pathname === tab.path ? 'active' : ''}`}
        >
          {tab.icon}
          <span className="text-[10px] font-semibold">{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}
