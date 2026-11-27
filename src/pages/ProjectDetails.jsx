import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FolderKanban } from 'lucide-react'
import { api } from '../api'
import SectionHeading from '../components/SectionHeading'
import StatusBadge from '../components/StatusBadge'
import PriorityBadge from '../components/PriorityBadge'

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [tasksError, setTasksError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setProject(null)
    setTasks([])
    setTasksError('')

    Promise.allSettled([api.getProject(id), api.getTasks()])
      .then(([projectResult, tasksResult]) => {
        if (!active) return
        if (projectResult.status === 'fulfilled') setProject(projectResult.value)
        if (tasksResult.status === 'fulfilled') setTasks(tasksResult.value)
        else setTasksError('Could not load project tasks. Check that the API is running.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [id])

  if (loading) return <div className="loading-state">Loading project…</div>
  if (!project) return <div className="empty-state"><strong>Project not found</strong><Link className="button button-primary" to="/projects">Back to projects</Link></div>
  const projectTasks = tasks.filter((task) => String(task.projectId) === String(project.id))

  return <div className="page-content"><Link to="/projects" className="back-link"><ArrowLeft size={15} /> All projects</Link><div className="project-detail-hero card"><div className="project-symbol large" style={{ background: `${project.color}18`, color: project.color }}><FolderKanban size={25} /></div><div><div className="eyebrow">PROJECT WORKSPACE</div><h1>{project.name}</h1><p>{project.description}</p></div></div><SectionHeading title="Project tasks" description={`${projectTasks.length} tasks connected to this project.`} action="Add task" to={`/tasks/new?projectId=${project.id}`} />{tasksError && <div className="form-error" role="alert">{tasksError}</div>}<div className="card project-task-list">{projectTasks.length ? projectTasks.map((task) => <Link to={`/tasks/${task.id}`} className="project-task-row" key={task.id}><div className="task-row-main"><strong>{task.title}</strong><span>{task.assignee || 'Unassigned'}</span></div><PriorityBadge priority={task.priority} /><StatusBadge status={task.status} /></Link>) : !tasksError && <div className="empty-state">No tasks have been added to this project yet.</div>}</div></div>
}
