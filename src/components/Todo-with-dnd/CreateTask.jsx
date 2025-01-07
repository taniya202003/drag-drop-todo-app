//----- This component is responsible for creating and editing tasks

import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ListTasks } from "./ListTasks";

export const CreateTask = ({ tasks, setTasks, editTask, setEditTask }) => {
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    status: "todo", // can also be inProgress or closed
  });

  useEffect(() => {
    if (editTask) {
      setInputData(editTask);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputData.name.length < 3)
      return toast.error("A task must have more than 3 characters");

    if (inputData.name.length > 100)
      return toast.error("A task must not be more than 100 characters");

    if (editTask) {
      // Update existing task
      setTasks((prev) => {
        const updatedTasks = prev.map((task) =>
          task.id === inputData.id ? inputData : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      toast.success("Task Updated");
    } else {
      // Create new task
      setTasks((prev) => {
        const prevData = [...prev, inputData];
        localStorage.setItem("tasks", JSON.stringify(prevData));
        return prevData;
      });
      toast.success("Task Created");
    }

    setInputData({
      id: "",
      name: "",
      status: "todo",
    });

    setEditTask(null);
  };

  return (
    <div className="allData-container-div">
      <h1>My Tasks ✅</h1>
      <span className="allData-span">
        <input
          className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-60 px-1 "
          type="text"
          value={inputData.name}
          onChange={(e) =>
            setInputData({
              ...inputData,
              id: editTask ? inputData.id : new Date().getTime(),
              name: e.target.value,
            })
          }
        />
         {/* setInputData({ ...inputData, id: uuidv4(), name: e.target.value }) 
         //--- uuidv4() this is npm library to create unique id's
        //--- we can also use new Date().getTime() to create new unique id's */}
        <button
          className="bg-cyan-500 rounded-md px-4 h-12 text-white"
          onClick={handleSubmit}
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>
      </span>
      <ListTasks tasks={tasks} setTasks={setTasks} setEditTask={setEditTask} />
    </div>
  );
};