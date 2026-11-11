import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Settings, GraduationCap } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/students', label: 'Students', icon: Users },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><GraduationCap size={22} /></span><span>Campus<span className="brand-accent">Flow</span></span></div>
      <p className="nav-caption">WORKSPACE</p>
      <nav>
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={18} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom"><div className="avatar">CF</div><div><strong>Campus Admin</strong><small>Administrator</small></div></div>
    </aside>
  );
}
