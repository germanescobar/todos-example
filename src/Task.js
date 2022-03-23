export default function Task({ task, toggleTask, deleteTask }) {
  return (
    <li key={task.id} onClick={() => toggleTask(task)}>{task.title} <span className="delete" onClick={() => deleteTask(task.id)}>x</span></li>
  )
}