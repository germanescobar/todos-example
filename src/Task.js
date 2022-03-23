export default function Task({ task, toggleTask, deleteTask }) {
  const handleDeleteTask = (e, id) => {
    e.stopPropagation()
    deleteTask(id)
  }

  return (
    <li onClick={e => toggleTask(e, task)}>{task.title} <span className="delete" role="button" onClick={e => handleDeleteTask(e, task.id)}>x</span></li>
  )
}