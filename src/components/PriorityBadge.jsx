import { Flag } from 'lucide-react'

export default function PriorityBadge({ priority }) {
  const label = priority || 'Unspecified'
  return <span className={`priority priority-${String(label).toLowerCase()}`}><Flag size={13} />{label}</span>
}
