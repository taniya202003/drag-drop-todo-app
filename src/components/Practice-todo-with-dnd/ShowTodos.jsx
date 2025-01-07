import React, { useContext, useEffect, useState } from "react";
import "../../assets/practiceDNDTodos.css";
import { DropTodos } from "./DropTodos";
import { Context } from "./TodosContext";

export const ShowTodos = () => {
  const { allTodosData } = useContext(Context);

  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const filterTodos = allTodosData.filter((t) => t.status === "todo");
    const filterInProgress = allTodosData.filter((t) => t.status === "inProgress");
    const filterCompleted = allTodosData.filter((t) => t.status === "completed");
    setTodos(filterTodos);
    setInProgress(filterInProgress);
    setCompleted(filterCompleted);
  }, [allTodosData]);

  const statuses = ["todo", "inProgress", "completed"];

  return (
    <div className="showTodo-container">
      {statuses.map((status, index) => (
        <DropTodos
          key={index}
          status={status}
          todos={todos}
          inProgress={inProgress}
          completed={completed}
        />
      ))}
    </div>
  );
};
