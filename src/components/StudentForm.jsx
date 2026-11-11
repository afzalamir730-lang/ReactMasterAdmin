import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const emptyStudent = { name: '', email: '', rollNo: '', department: 'Computer Science', semester: '2nd', fees: 12000, status: 'Active' };

export default function StudentForm({ student, onSave, onClose, saving }) {
  const [form, setForm] = useState(student || emptyStudent);
  const nameRef = useRef(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: name === 'fees' ? Number(value) : value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(form);
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="student-form-title">
        <div className="modal-head"><div><span className="eyebrow">STUDENT RECORD</span><h2 id="student-form-title">{student ? 'Edit student' : 'Add a student'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close form"><X size={20} /></button></div>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>Full name<input ref={nameRef} name="name" value={form.name} onChange={handleChange} placeholder="Enter student name" required minLength={2} /></label>
          <label>Email<input name="email" type="email" value={form.email} onChange={handleChange} placeholder="student@example.com" required /></label>
          <label>Roll number<input name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="2025-UOB-0001" required /></label>
          <label>Department<select name="department" value={form.department} onChange={handleChange}><option>Computer Science</option><option>Software Engineering</option><option>Information Technology</option><option>Mathematics</option></select></label>
          <label>Semester<select name="semester" value={form.semester} onChange={handleChange}>{['1st','2nd','3rd','4th','5th','6th','7th','8th'].map(s => <option key={s}>{s}</option>)}</select></label>
          <label>Fees (Rs.)<input name="fees" type="number" min="0" value={form.fees} onChange={handleChange} required /></label>
          <label>Status<select name="status" value={form.status} onChange={handleChange}><option>Active</option><option>Pending</option></select></label>
          <div className="form-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button type="submit" className="button primary" disabled={saving}>{saving ? 'Saving…' : 'Save student'}</button></div>
        </form>
      </section>
    </div>
  );
}
