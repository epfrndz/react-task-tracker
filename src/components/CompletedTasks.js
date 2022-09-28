import React from 'react'
import Tasks from './Tasks'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const CompletedTasks = ({ onDelete, onToggle, onComplete }) => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }

    getTasks();
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5500/tasks')
    const data = await res.json()

    return data
  }

  // Decomplete Task
  const decompleteTask = async (id) => {
    const targetTask = tasks.filter((task) => task.id === id)[0];
    const decompletedTask = {...targetTask,
      "status": "incomplete"
    }

    await fetch(`http://localhost:5500/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(decompletedTask)
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div>
      Completed Tasks
      <Tasks tasks={tasks} onDelete={onDelete} onToggle={onToggle} onComplete={onComplete} onDecomplete={decompleteTask}/>
      <Link to="/">Go Back</Link>
    </div>
  )
}

export default CompletedTasks