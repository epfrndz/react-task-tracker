import Task from "./Task";
import React from "react";
import { useLocation } from "react-router-dom";

const Tasks = ({ tasks, onDelete, onToggle, onComplete, onDecomplete }) => {
  const location = useLocation();
  return (
    <>
      {tasks.map((task) => {
        let completedTasksCheckValue =
          location.pathname === "/completed" ? "complete" : "incomplete";
        if (task.status === completedTasksCheckValue) {
          return (
            <Task
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onComplete={onComplete}
              onDecomplete={onDecomplete}
            />
          );
        }
      })}
    </>
  );
};

export default Tasks;
