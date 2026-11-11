import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => localStorage.getItem('campusflow-user'));
  const login = (email, password) => {
    // Demo-only login. Replace this with a secure backend in a real deployment.
    if (email === 'admin@campusflow.com' && password === 'admin123') {
      localStorage.setItem('campusflow-user', 'Administrator');
      setUser('Administrator');
      return true;
    }
    return false;
  };
  const logout = () => {
    localStorage.removeItem('campusflow-user');
    setUser(null);
  };
  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
