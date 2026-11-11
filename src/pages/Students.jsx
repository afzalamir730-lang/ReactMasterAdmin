import { useCallback, useMemo, useRef, useState } from 'react';
import { Plus, Search, Users, Wallet, Filter } from 'lucide-react';
import { studentApi } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import StudentRow from '../components/StudentRow';
import StudentForm from '../components/StudentForm';
import StatCard from '../components/StatCard';

export default function Students() {
  const { data: students, setData: setStudents, loading, error } = useFetch(studentApi.getAll, []);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const searchRef = useRef(null);

  const filteredStudents = useMemo(() => students.filter(student => {
    const text = `${student.name} ${student.rollNo} ${student.department}`.toLowerCase();
    const matchesText = text.includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesText && matchesStatus;
  }), [students, query, statusFilter]);
  const totalFees = useMemo(() => students.reduce((sum, student) => sum + Number(student.fees || 0), 0), [students]);

  const handleEdit = useCallback((student) => { setEditingStudent(student); setShowForm(true); }, []);
  const handleDelete = useCallback(async (id) => {
    const confirmed = window.confirm('Delete this student record? This cannot be undone.');
    if (!confirmed) return;
    try {
      await studentApi.remove(id);
      setStudents(current => current.filter(student => student.id !== id));
      setMessage('Student deleted successfully.');
    } catch (err) { setMessage(err.message); }
  }, [setStudents]);

  async function handleSave(form) {
    setSaving(true); setMessage('');
    try {
      if (editingStudent) {
        const updated = await studentApi.update(editingStudent.id, { ...form, id: editingStudent.id });
        setStudents(current => current.map(student => student.id === editingStudent.id ? updated : student));
        setMessage('Student updated successfully.');
      } else {
        const created = await studentApi.create({ ...form, id: `STU-${Date.now()}` });
        setStudents(current => [created, ...current]);
        setMessage('Student added successfully.');
      }
      setShowForm(false); setEditingStudent(null);
    } catch (err) { setMessage(`Could not save: ${err.message}`); }
    finally { setSaving(false); }
  }

  function openAddForm() { setEditingStudent(null); setShowForm(true); }

  if (loading) return <div className="state-card">Loading students…</div>;
  if (error) return <div className="state-card error-text">{error}. Start the API server with <code>npm run server</code>.</div>;

  return (
    <div className="page-stack">
      <div className="page-intro"><div><p className="muted">Manage admissions, student details and fee records.</p></div><button className="button primary" onClick={openAddForm}><Plus size={17} /> Add student</button></div>
      <section className="stats-grid compact-stats"><StatCard title="All students" value={students.length} note="Total student records" icon={Users} /><StatCard title="Total fees" value={`Rs. ${totalFees.toLocaleString()}`} note="Calculated with reduce()" icon={Wallet} tone="green" /></section>
      <section className="panel table-panel">
        <div className="table-toolbar"><div><h3>Student directory</h3><p className="muted">Search, filter, add, edit or delete student records.</p></div><div className="table-controls"><div className="search-box"><Search size={16} /><input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students…" aria-label="Search students" /></div><div className="select-box"><Filter size={15} /><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status"><option>All</option><option>Active</option><option>Pending</option></select></div></div></div>
        {message && <div className="notice" role="status">{message}</div>}
        <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>ROLL NUMBER</th><th>DEPARTMENT</th><th>SEMESTER</th><th>FEES</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>
          {filteredStudents.map(student => <StudentRow key={student.id} student={student} onEdit={handleEdit} onDelete={handleDelete} />)}
        </tbody></table>{filteredStudents.length === 0 && <div className="empty-state">No students match your search.</div>}</div>
        <div className="table-footer">Showing {filteredStudents.length} of {students.length} students <button className="subtle-link" onClick={() => searchRef.current?.focus()}>Focus search</button></div>
      </section>
      {showForm && <StudentForm student={editingStudent} onSave={handleSave} onClose={() => { setShowForm(false); setEditingStudent(null); }} saving={saving} />}
    </div>
  );
}
