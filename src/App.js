import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import CompletedTasks from "./components/CompletedTasks";
import React from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("this mounted");
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5500/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5500/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Load Tasks from Server
  const loadTasks = async () => {
    const tasksFromServer = await fetchTasks();

    setTasks(tasksFromServer);
  };

  // Load and Filter Tasks from Server
  const loadAndFilterTasks = async (filterFunction) => {
    await loadTasks();

    setTasks(filterFunction(tasks));
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5500/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5500/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Set Task to Complete
  const completeTask = async (id) => {
    const targetTask = tasks.filter((task) => task.id === id)[0];
    const completedTask = { ...targetTask, status: "complete" };

    await fetch(`http://localhost:5500/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(completedTask),
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "complete" } : task
      )
    );
    console.log(tasks, "co task");
  };

  // Decomplete Task
  const decompleteTask = async (id) => {
    const targetTask = tasks.filter((task) => task.id === id)[0];
    const decompletedTask = {
      ...targetTask,
      status: "incomplete",
      decompleted: true,
    };

    await fetch(`http://localhost:5500/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(decompletedTask),
    });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "incomplete" } : task
      )
    );
    console.log(tasks, "unc task");
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5500/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                    onComplete={completeTask}
                    onDecomplete={decompleteTask}
                  />
                ) : (
                  "No Tasks to Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/completed"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                    onComplete={completeTask}
                    onDecomplete={decompleteTask}
                  />
                ) : (
                  "No Tasks to Show"
                )}
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
