import React, { useContext } from "react";
import "../../assets/practiceDNDTodos.css";
import { useDrop } from "react-dnd";
import { Context } from "./TodosContext";
import { TodoHeaders } from "../Practice-todo-with-dnd/TodoHeaders";
import { DragTodos } from "../Practice-todo-with-dnd/DragTodos";

export const DropTodos = ({ status, todos, inProgress, completed }) => {
  const { setAllTodosData } = useContext(Context);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addItemToSection(item.id, item.status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-orange-500";
  // let bg = "bg-[#a3c024]";
  let todoToMap = todos;

  if (status === "inProgress") {
    text = "In Progress";
    bg = "bg-purple-500";
    todoToMap = inProgress;
  }

  if (status === "completed") {
    text = "Completed";
    bg = "bg-green-500";
    todoToMap = completed;
  }

  const addItemToSection = (id, originalStatus) => {
    if (originalStatus !== status) {
      setAllTodosData((prev) => {
        const mapTodo = prev.map((t) => {
          if (t.id === id) {
            return { ...t, status: status };
          }
          return t;
        });
        localStorage.setItem("todos", JSON.stringify(mapTodo));
        return mapTodo;
      });
    }
  };

  return (
    <div
      ref={drop}
      className={`dropTodos-container ${isOver ? "bg-slate-200" : ""}`}
    >
      <TodoHeaders
        text={text}
        status={status}
        todosLength={todoToMap.length}
        bg={bg}
      />
      {todoToMap.length > 0 &&
        todoToMap.map((todo) => (
          <DragTodos key={todo.id} todo={todo} status={status} />
        ))}
    </div>
  );
};
