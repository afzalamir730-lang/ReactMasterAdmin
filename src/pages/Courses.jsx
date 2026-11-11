import { BookOpen, Users } from 'lucide-react';
import { courseApi } from '../services/api';
import { useFetch } from '../hooks/useFetch';

export default function Courses() {
  const { data: courses, loading, error } = useFetch(courseApi.getAll, []);
  if (loading) return <div className="state-card">Loading courses…</div>;
  if (error) return <div className="state-card error-text">{error}. Check that the API server is running.</div>;
  return <div className="page-stack"><div className="page-intro"><p className="muted">Browse the courses currently listed in the campus database.</p><span className="badge info">{courses.length} courses</span></div><section className="course-grid">{courses.map(course => <article className="panel course-card" key={course.id}><div className="course-icon"><BookOpen size={22} /></div><span className="eyebrow">{course.code}</span><h3>{course.title}</h3><p className="muted">Instructor: {course.teacher}</p><div className="course-meta"><span><Users size={15} /> {course.students} students</span><span>{course.semester} semester</span></div></article>)}</section></div>;
}
