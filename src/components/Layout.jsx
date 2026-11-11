import { Outlet, useLocation } from 'react-router-dom';
import { Bell, LogOut, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const titles = { '/': 'Dashboard', '/students': 'Students', '/courses': 'Courses', '/settings': 'Settings' };

export default function Layout() {
  const { logout, user } = useAuth();
  const location = useLocation();
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-area">
        <header className="topbar">
          <div><span className="eyebrow">CAMPUS MANAGEMENT</span><h1>{titles[location.pathname] || 'CampusFlow'}</h1></div>
          <div className="top-actions"><div className="top-search"><Search size={16} /><span>Admin workspace</span></div><button className="icon-button" title="Notifications" aria-label="Notifications"><Bell size={18} /></button><div className="user-chip"><div className="avatar small">A</div><span>{user}</span></div><button className="icon-button" onClick={logout} title="Sign out" aria-label="Sign out"><LogOut size={18} /></button></div>
        </header>
        <div className="page-content"><Outlet /></div>
        <footer className="footer">CampusFlow · React learning project · Demo data</footer>
      </main>
    </div>
  );
}
