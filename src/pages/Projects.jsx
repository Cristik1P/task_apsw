import { useEffect, useState } from 'react'
import { ArrowUpRight, FolderKanban } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import SectionHeading from '../components/SectionHeading'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [tasksAvailable, setTasksAvailable] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tasksError, setTasksError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setProjects([])
    setTasks([])
    setTasksAvailable(true)
    setError('')
    setTasksError('')

    Promise.allSettled([api.getProjects(), api.getTasks()])
      .then(([projectResult, tasksResult]) => {
        if (!active) return
        if (projectResult.status === 'fulfilled') setProjects(projectResult.value)
        else setError('Could not load projects. Check that the API is running.')
        if (tasksResult.status === 'fulfilled') setTasks(tasksResult.value)
        else {
          setTasksAvailable(false)
          setTasksError('Task counts and progress are unavailable because tasks could not be loaded.')
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [])

  return <div className="page-content"><SectionHeading eyebrow="YOUR WORKSPACE" title="Projects" description="A home for every idea, milestone, and team effort." /><div className="project-intro"><div className="project-intro-icon"><FolderKanban size={21} /></div><div><strong>Your team's work, organized.</strong><span>Explore projects and see what's moving forward.</span></div><span className="project-total">{projects.length} active projects</span></div>{error && <div className="form-error" role="alert">{error}</div>}{tasksError && <div className="form-error" role="alert">{tasksError}</div>}{loading ? <div className="loading-state">Loading projects…</div> : projects.length ? <div className="projects-grid">{projects.map((project, index) => { const projectTasks = tasks.filter((task) => String(task.projectId) === String(project.id)); const done = projectTasks.filter((task) => String(task.status).toLowerCase() === 'done').length; const progress = projectTasks.length ? Math.round(done / projectTasks.length * 100) : 0; return <article className="project-card card" key={project.id}><div className="project-card-top"><div className="project-symbol" style={{ background: `${project.color}18`, color: project.color }}><FolderKanban size={21} /></div></div><span className="project-overline">PROJECT {String(index + 1).padStart(2, '0')}</span><h3>{project.name}</h3><p>{project.description}</p><div className="project-progress-meta"><span>Progress</span><strong>{tasksAvailable ? `${progress}%` : '—'}</strong></div><div className="progress-track"><div className="progress-fill" style={{ width: `${tasksAvailable ? progress : 0}%`, background: project.color }} /></div><div className="project-card-footer"><span>{tasksAvailable ? `${projectTasks.length} tasks · ${done} completed` : 'Task data unavailable'}</span><Link to={`/projects/${project.id}`} className="project-open">View project <ArrowUpRight size={15} /></Link></div></article> })}</div> : !error && <div className="empty-state">No projects found.</div>}</div>
}
