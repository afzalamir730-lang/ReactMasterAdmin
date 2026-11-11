import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GraduationCap, LockKeyhole } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@campusflow.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  if (user) return <Navigate to="/" replace />;

  function handleSubmit(event) {
    event.preventDefault();
    if (login(email, password)) navigate('/');
    else setError('Incorrect demo email or password. Please try again.');
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo"><GraduationCap size={27} /></div>
        <span className="eyebrow">CAMPUS MANAGEMENT PLATFORM</span>
        <h1>Welcome back</h1><p className="muted">Sign in to your CampusFlow admin workspace.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@example.com" /></label>
          <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter password" /></label>
          {error && <p className="error-text">{error}</p>}
          <button className="button primary full" type="submit"><LockKeyhole size={16} /> Sign in</button>
        </form>
        <div className="demo-credentials"><strong>Demo credentials</strong><span>admin@campusflow.com</span><span>admin123</span></div>
        <p className="login-footnote">Learning project only. This demo login is not production authentication.</p>
      </section>
    </main>
  );
}
