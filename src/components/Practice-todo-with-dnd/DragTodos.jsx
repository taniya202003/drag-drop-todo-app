import React, { useContext } from "react";
import "../../assets/practiceDNDTodos.css";
import { useDrag, useDrop } from "react-dnd";
import { Context } from "./TodosContext";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { toast } from "react-toastify";

export const DragTodos = ({ todo, status }) => {
  const { allTodosData, setAllTodosData, editTodo } = useContext(Context);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo", // type has to be same for drop and drag both
    item: { id: todo.id, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: "todo", // in drop use "accept" in the place of type
    hover: (dragedTodoIndex) => {
      if (!allTodosData || allTodosData.length === 0) return;

      const dragedTodo = allTodosData.findIndex(
        (t) => t.id === dragedTodoIndex.id
      );
      const targetedTodo = allTodosData.findIndex((t) => t.id === todo.id);

      if (
        dragedTodo === targetedTodo ||
        dragedTodo === -1 ||
        targetedTodo === -1
      )
        return;

      const reorderTodos = [...allTodosData];
      const [index] = reorderTodos.splice(dragedTodo, 1);
      reorderTodos.splice(targetedTodo, 0, index);

      setAllTodosData(reorderTodos);
    },
  });

  const handleEdit = (id) => {
    editTodo(id);
  };

  const handleDelete = (id) => {
    const deleteTodo = allTodosData.filter((t) => t.id !== id);
    localStorage.setItem("todos", JSON.stringify(deleteTodo));
    setAllTodosData(deleteTodo);
    toast.success("Todo has been removed successfully")
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`dragTodos-container ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <div className="dragTodos-todo">{todo.name}</div>

      <div className="dragTodos-btn-div">
        <button
          className="dragTodos-editBtn"
          onClick={() => handleEdit(todo.id)}
        >
          <MdEditSquare />
        </button>
        <button
          className="dragTodos-deleteBtn"
          onClick={() => handleDelete(todo.id)}
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
};
