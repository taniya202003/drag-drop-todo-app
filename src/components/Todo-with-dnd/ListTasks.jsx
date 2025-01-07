// ----- This component is responsible for displaying the tasks categorized into different statuses ("Todo", "In Progress", "Completed").

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDrag, useDrop } from "react-dnd";

export const ListTasks = ({ tasks, setTasks, setEditTask }) => {
  const [todos, setTodos] = useState([]); // this state is for todos
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

console.log(tasks,'tasks') // it contain all tasks data 
console.log(todos,'todos') // it contain only that data that is in Todos section or header 

  // in this useEffect we are filtering our states on the base of status key that is given in inputData
  useEffect(() => {
    const filterTodos = tasks.filter((task) => task.status === "todo");
    // console.log(filterTodos,'filterTodos')
    const filterProgressTodo = tasks.filter(
      (task) => task.status === "inProgress"
    );
    const filterCompletedTodo = tasks.filter(
      (task) => task.status === "completed"
    );
    setTodos(filterTodos);
    setInProgress(filterProgressTodo);
    setCompleted(filterCompletedTodo);
  }, [tasks]);

  const statuses = ["todo", "inProgress", "completed"]; // in this variable we are defining our todo status

  return (
    <div>
      <div className="flex gap-16 mt-10">
        {statuses.map((status, index) => (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            setEditTask={setEditTask}
            todos={todos}
            inProgress={inProgress}
            completed={completed}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================================================================

//  this section is used for those sections or components where we want to drop our elements
const Section = ({
  status,
  tasks,
  setTasks,
  setEditTask,
  todos,
  inProgress,
  completed,
}) => {
  // this part is from DND library for droping the elements
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tsk",
    drop: (item) => addItemToSection(item.id, item.status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inProgress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }

  if (status === "completed") {
    text = "Completed";
    bg = "bg-green-500";
    tasksToMap = completed;
  }

  const addItemToSection = (id, originalStatus) => {
    if (originalStatus !== status) {
      setTasks((prev) => {
        const mapTasks = prev.map((t) => {
          if (t.id === id) {
            return { ...t, status: status };
          }
          return t;
        });
        localStorage.setItem("tasks", JSON.stringify(mapTasks));
        toast("Task status is changed");
        return mapTasks;
      });
    }
  };

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 min-h-[400px] ${
        isOver ? "bg-slate-200" : ""
      }`}
    >
      <Headers text={text} status={status} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((tsk, index) => (
          <Task
            key={tsk.id}
            tsk={tsk}
            tasks={tasks}
            setTasks={setTasks}
            setEditTask={setEditTask}
            status={status}
            index={index}
            originalStatus={tasks}
          />
        ))}
    </div>
  );
};

// ============================================================================================================================

{
  /* this section is used to map the heading  and quantity of todos */
}
const Headers = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

// ============================================================================================================================

// this section is used to define draged elements
const Task = ({
  tsk,
  tasks = [],
  setTasks,
  setEditTask,
  status,
  index
}) => {
  // this part is from DND library for draging
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tsk",
    item: { id: tsk.id, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // console.log(originalTasks,'originalTasks')

    const [, drop] = useDrop({
      accept: "tsk",
      hover: (draggedItem) => {
        if (!tasks || tasks.length === 0) return;

        // Find the index of the dragged item and the target item
        const draggedTaskIndex = tasks.findIndex(
          (task) => task.id === draggedItem.id
        );
        const targetTaskIndex = tasks.findIndex((task) => task.id === tsk.id);

        // Return if the dragged item is hovered over itself or index are invalid
        //This condition checks if the dragged item is hovered over itself or if any index is invalid (`-1`), in which case it exits the function without making changes.
        if (
          draggedTaskIndex === targetTaskIndex ||
          draggedTaskIndex === -1 || targetTaskIndex === -1
        )
          return;

        // Reorder the tasks by swapping positions
        // The tasks array is cloned, and the dragged item is removed from its original position and inserted into the new position based on where it's being hovered.
        const reorderedTasks = [...tasks];
        const [index] = reorderedTasks.splice(draggedTaskIndex, 1);
        reorderedTasks.splice(targetTaskIndex, 0, index);

        // Update tasks with reordered list 
        setTasks(reorderedTasks);
      },
    });

  const handleRemove = (id) => {
    const removeTask = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(removeTask));
    setTasks(removeTask);
    toast("Task removed");
  };

  const handleEdit = (id) => {
    const editTask = tasks.find((t) => t.id === id);
    setEditTask(editTask);
  };

  return (
    <div
      // ref={drag}
      ref={(node) => drag(drop(node))}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      {/* <SortableContext items={tasks} strategy={verticalListSortingStrategy}> */}
      <div className="flex">
        <p>{tsk.name}</p>

        <button
          className="absolute bottom-1 right-1 text-slate-400 border-none"
          onClick={() => handleRemove(tsk.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>

        <button
          className="absolute bottom-1 right-8 text-slate-400 border-none"
          onClick={() => handleEdit(tsk.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </div>
      {/* </SortableContext> */}
    </div>
  );
};
