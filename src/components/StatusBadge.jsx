export default function StatusBadge({ status }) {
  const map = {
    'To do': ['status-todo', 'To do'],
    'In progress': ['status-progress', 'In progress'],
    'Review': ['status-review', 'In review'],
    'Done': ['status-done', 'Done'],
  }
  const normalizedStatus = String(status || '').toLocaleLowerCase()
  const [className, label] = map[Object.keys(map).find((key) => key.toLocaleLowerCase() === normalizedStatus)] || ['status-todo', status || 'Unknown status']
  return <span className={`status-badge ${className}`}><span className="status-dot" />{label}</span>
}
