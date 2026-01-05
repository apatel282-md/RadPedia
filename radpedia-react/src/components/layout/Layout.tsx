import { Outlet } from 'react-router-dom';
import Header from './Header';
import TabBar from './TabBar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-100 text-brand-text-100 font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <TabBar />
    </div>
  );
}
