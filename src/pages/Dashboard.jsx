import { useMemo } from 'react';
import { Users, Wallet, BookOpen, GraduationCap, ArrowUpRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { studentApi, courseApi } from '../services/api';
import { useFetch } from '../hooks/useFetch';

export default function Dashboard() {
  const students = useFetch(studentApi.getAll, []);
  const courses = useFetch(courseApi.getAll, []);
  const totalFees = useMemo(() => students.data.reduce((sum, student) => sum + Number(student.fees || 0), 0), [students.data]);
  const activeStudents = useMemo(() => students.data.filter(student => student.status === 'Active').length, [students.data]);
  const recentStudents = useMemo(() => [...students.data].slice(-4).reverse(), [students.data]);

  if (students.loading || courses.loading) return <div className="state-card">Loading dashboard data…</div>;
  if (students.error || courses.error) return <div className="state-card error-text">{students.error || courses.error}. Make sure the API server is running on port 3001.</div>;

  return (
    <div className="page-stack">
      <section className="welcome-banner"><div><span className="eyebrow light">SATURDAY · CAMPUS OVERVIEW</span><h2>Good afternoon, Administrator 👋</h2><p>Here is what is happening across your campus today.</p></div><div className="banner-art"><GraduationCap size={76} /></div></section>
      <section className="stats-grid">
        <StatCard title="Total students" value={students.data.length} note={`${activeStudents} active students`} icon={Users} tone="blue" />
        <StatCard title="Fee total" value={`Rs. ${totalFees.toLocaleString()}`} note="Sum of listed student fees" icon={Wallet} tone="green" />
        <StatCard title="Courses" value={courses.data.length} note="Available course records" icon={BookOpen} tone="purple" />
        <StatCard title="Active students" value={activeStudents} note="Currently active" icon={GraduationCap} tone="orange" />
      </section>
      <section className="content-grid">
        <article className="panel recent-panel"><div className="panel-heading"><div><span className="eyebrow">STUDENT DIRECTORY</span><h3>Recently added students</h3></div><Link className="text-link" to="/students">View all <ArrowUpRight size={15} /></Link></div>
          {recentStudents.length ? <div className="recent-list">{recentStudents.map(student => <div className="recent-item" key={student.id}><div className="student-avatar">{student.name[0]}</div><div className="recent-name"><strong>{student.name}</strong><small>{student.rollNo}</small></div><span className={`badge ${student.status === 'Active' ? 'success' : 'warning'}`}>{student.status}</span></div>)}</div> : <p className="muted">No student records yet.</p>}
        </article>
        <article className="panel tip-panel"><div className="tip-icon"><Clock3 size={21} /></div><span className="eyebrow">QUICK TIP</span><h3>Keep student records up to date</h3><p>Add new admissions, update semester information, and review fee totals from the Students page.</p><Link className="button primary" to="/students">Manage students</Link></article>
      </section>
      <p className="data-note">Dashboard totals are calculated from API data using JavaScript array methods such as <code>reduce()</code> and <code>filter()</code>.</p>
    </div>
  );
}
