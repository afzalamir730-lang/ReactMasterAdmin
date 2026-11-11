import { memo } from 'react';

// React.memo: this card can skip rendering when its props have not changed.
function StatCard({ title, value, note, icon: Icon, tone = 'blue' }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={20} /></div>
      <p>{title}</p><strong>{value}</strong><small>{note}</small>
    </article>
  );
}
export default memo(StatCard);
