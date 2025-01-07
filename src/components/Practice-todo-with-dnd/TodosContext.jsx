import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Context = createContext();

export const TodosContext = ({ children }) => {
  const [allTodosData, setAllTodosData] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  useEffect(() => {
    const getTodos = JSON.parse(localStorage.getItem("todos")) || []; 
    if (getTodos.length !== 0) {
      setAllTodosData(getTodos);
    } else {
      return;
    }
  }, []);

  const addTodo = () => {
    if(inputData.name.length === 0){
        return toast.error("You can not add empty todo");
    }

    if(inputData.name.length < 3){
        return toast.error("A task must have more than 3 characters");
    }

    if(inputData.name.length > 100){
        return toast.error("A task must not be more than 100 characters");
    }

    if (editedTodo) {
      const updateTodo = allTodosData.map((todo) =>
        todo.id === inputData.id ? inputData : todo
      );
      localStorage.setItem("todos", JSON.stringify(updateTodo));
      setAllTodosData(updateTodo);
      setIsEditing(false);
      toast.success('Todo has been updated')
    } else {
      setAllTodosData((prev) => {
        const prevData = [...prev, inputData];
        localStorage.setItem("todos", JSON.stringify(prevData));
        return prevData;
      });
      toast.success("New Todo has been added successfully")
    }

    setInputData({
      id: "",
      name: "",
      status: "todo",
    });
  };

  const editTodo = (id) => {
    const findEditTodo = allTodosData.find((t) => t.id === id);
    setInputData(findEditTodo);
    setEditedTodo(id);
    setIsEditing(true);
  };

  return (
    <div>
      <Context.Provider
        value={{
          allTodosData,
          setAllTodosData,
          inputData,
          setInputData,
          addTodo,
          editTodo,
          editedTodo,
          isEditing,
        }}
      >
        {children}
      </Context.Provider>
    </div>
  );
};
