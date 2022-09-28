import { FaTimes, FaCheck } from "react-icons/fa";
import React from "react";

const Task = ({ task, onDelete, onToggle, onComplete, onDecomplete }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
      <button
        onClick={() => {
          if (task.status === "complete") {
            onDecomplete(task.id);
          } else {
            onComplete(task.id);
          }
        }}
      >
        Mark {task.status === "complete" ? "Incomplete" : "Complete"}
      </button>
      <div>
        {task.status === "complete" ? (
          <FaCheck style={{ color: "green" }}></FaCheck>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Task;
