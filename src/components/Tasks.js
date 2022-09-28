import Task from './Task'
import React from 'react'



const Tasks = ({ tasks, onDelete, onToggle, onComplete }) => {

  return (
    <>
      {tasks.map((task) => {
          if (task.status === "incomplete") {
            return <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onComplete={onComplete}/>
          }
      }
      )}
    </>
  )
}

export default Tasks