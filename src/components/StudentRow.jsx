import { memo } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

function StudentRow({ student, onEdit, onDelete }) {
  return (
    <tr>
      <td><div className="student-cell"><div className="student-avatar">{student.name.slice(0, 1).toUpperCase()}</div><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td>
      <td>{student.rollNo}</td><td>{student.department}</td><td>{student.semester}</td>
      <td>Rs. {Number(student.fees).toLocaleString()}</td>
      <td><span className={`badge ${student.status === 'Active' ? 'success' : 'warning'}`}>{student.status}</span></td>
      <td><div className="row-actions"><button className="icon-button" title="Edit student" aria-label={`Edit ${student.name}`} onClick={() => onEdit(student)}><Pencil size={16} /></button><button className="icon-button danger" title="Delete student" aria-label={`Delete ${student.name}`} onClick={() => onDelete(student.id)}><Trash2 size={16} /></button></div></td>
    </tr>
  );
}
export default memo(StudentRow);
