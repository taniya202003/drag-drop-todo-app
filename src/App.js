import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Home } from "./pages/Home";
import { AllData } from "./components/Todo-without-dnd/AllData";
import { CreateTask } from "./components/Todo-with-dnd/CreateTask";
import { CreateTodo } from "./components/Practice-todo-with-dnd/CreateTodo";


function App() {
  const [tasks, setTasks] = useState([]); // this state is used to store all todo app data
  const [isEditing, setIsEditing] = useState(false) // this is used for toogle in edit btn 
  const [editTask,setEditTask] = useState(null) // this is used for the todo that is going to be edited

  useEffect(() => {
    if(tasks.length !== 0){
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }else{
      return 
    }
  }, []);

  return (
    <div className="App w-screen h-screen flex flex-col items-center pt-3 gap-16">
      <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alldata" element={<AllData />} />
          <Route
            path="/createtask"
            element={<CreateTask tasks={tasks} setTasks={setTasks} isEditing={isEditing} setIsEditing={setIsEditing} editTask={editTask} setEditTask={setEditTask}/>}
          />

          <Route path="/createtodo" element={<CreateTodo/>}/>

      </Routes>
      </DndProvider>
    </div>
  );
}

export default App;
