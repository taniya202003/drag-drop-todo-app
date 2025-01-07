import React from "react";
import "../../assets/practiceDNDTodos.css";

export const TodoHeaders = ({ bg, text, todosLength }) => {
  return (
    <div className={`todoHeaders-container ${bg}`}>
      <h4 className="todoHeader-heading">{text}</h4>
      <div className="todoHeader-length">{todosLength}</div>
    </div>
  );
};
