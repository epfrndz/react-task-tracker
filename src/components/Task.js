import { FaTimes } from 'react-icons/fa'
import React from 'react'



const Task = ({ task, onDelete, onToggle, onComplete }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task.id)}/></h3>
      <p>{task.day}</p>
      <button onClick={() => onComplete(task.id)}>Mark Completed</button>
    </div>
  )
}

export default Task