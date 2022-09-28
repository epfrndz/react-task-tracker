import React from 'react'
import Tasks from './Tasks'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const CompletedTasks = ({ onDelete, onToggle, onComplete, onDecomplete }) => {
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

  return (
    <div>
      Completed Tasks
      <Tasks tasks={tasks} onDelete={onDelete} onToggle={onToggle} onComplete={onComplete} onDecomplete={onDecomplete}/>
      <Link to="/">Go Back</Link>
    </div>
  )
}

export default CompletedTasks