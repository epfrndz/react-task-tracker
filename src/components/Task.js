import { FaTimes, FaCheck } from "react-icons/fa";
import { VscRefresh, VscChromeClose } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import React from "react";

const Task = ({ task, onDelete, onToggle, onComplete, onDecomplete }) => {
  const location = useLocation();

  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <VscChromeClose
          style={{ color: "#ff7260", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
      <div className="task-footer">
        <Button
          color={"#AA99FF"}
          text={
            task.status === "complete" ? "Mark Incomplete" : "Mark Complete"
          }
          onClick={() => {
            if (task.status === "complete") {
              onDecomplete(task.id);
            } else {
              onComplete(task.id);
            }
          }}
        />
        <div style={{ display: "flex", "flex-flow": "row-reverse" }}>
          {task.status === "complete" ? (
            <FaCheck style={{ color: "green" }}></FaCheck>
          ) : (
            ""
          )}
          {location.pathname === "/" && task.decompleted === true && (
            <VscRefresh style={{ color: "lightblue" }}></VscRefresh>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
