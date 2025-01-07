import { createContext, useEffect, useState } from "react";

export const ContextProvider = createContext();

export const Context = ({ children }) => {
  const [inputData, setInputData] = useState("");
  const [tasksData, setTasksData] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getTaskData = JSON.parse(localStorage.getItem("tasksData"));
    if (getTaskData) {
      setTasksData(getTaskData);
    }
  }, []);

  useEffect(() => {
    if (tasksData.length) {
      localStorage.setItem("tasksData", JSON.stringify(tasksData));
    }
  }, [tasksData]);

  const addData = () => {
    if (isEditing) {
      const updateTask = tasksData.map((task) =>
        task.id === editedTask ? { ...task, task: inputData } : task
      );
      setTasksData(updateTask);
      setIsEditing(false);
      setEditedTask(null);
      setInputData("");
    } else {
      setTasksData((prev) => [
        ...prev,
        { id: new Date().getTime(), task: inputData },
      ]);
      setInputData("");
    }
  };

  const editData = (id) => {
    const editTask = tasksData.find((task) => task.id === id);
    setInputData(editTask.task);
    setIsEditing(true);
    setEditedTask(id);
  };

  const deleteData = (id) => {
    const deleteTask = tasksData.filter((task) => task.id !== id);
    setTasksData(deleteTask); 
  };

  return (
    <ContextProvider.Provider
      value={{
        addData,
        editData,
        deleteData,
        inputData,
        setInputData,
        tasksData,
        setTasksData,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
