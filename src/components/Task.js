import { FaTimes, FaCheck } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { useLocation } from 'react-router-dom';
import Button from './Button';
import React from "react";

const Task = ({ task, onDelete, onToggle, onComplete, onDecomplete }) => {
  const location = useLocation()

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
      <Button
        color={"steelblue"}
        text={task.status === "complete" ? "Mark Incomplete" : "Mark Complete"}
        onClick={() => {
          if (task.status === "complete") {
            onDecomplete(task.id);
          } else {
            onComplete(task.id);
          }
        }}
      />
      <div
        style={{display: "flex", "flex-flow": "row-reverse"}}
      >
        {task.status === "complete" ? (
          <FaCheck style={{ color: "green" }}></FaCheck>
        ) : (
          ""
        )}
        {location.pathname === "/" && task.decompleted === true && 
          <VscDebugRestart style={{color: "lightblue"}}></VscDebugRestart>
        }
      </div>
    </div>
  );
};

export default Task;
