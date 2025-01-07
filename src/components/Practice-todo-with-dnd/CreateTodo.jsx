import React, { useContext, useEffect, useState } from "react";
import "../../assets/practiceDNDTodos.css";
import { ShowTodos } from "./ShowTodos";
import { Context } from "./TodosContext";
import { IoIosMoon } from "react-icons/io";
import { FaSun } from "react-icons/fa";

export const CreateTodo = () => {
  const { inputData, setInputData, addTodo, editedTodo, isEditing } =
    useContext(Context);

  const [toggleDarkMode,setToggleDarkMode] = useState(false)

useEffect(()=>{
const selectedTheme = JSON.parse(localStorage.getItem("toggleDarkMode"))
if(selectedTheme){
  setToggleDarkMode(selectedTheme)
  document.body.classList.toggle("dark-mode", JSON.parse(selectedTheme)) 
  // this is used to change the background color on the base of theme dark or light
  // with this the body background color will change according to theme
}
},[])

  const handleSelectMode = () =>{
    const selectMode = !toggleDarkMode
  setToggleDarkMode(selectMode)
  document.body.classList.toggle("dark-mode",selectMode)
  localStorage.setItem("toggleDarkMode", JSON.stringify(selectMode)) 
  // we have to set togglemode in localStorage the reason behind this is that when user refresh the page then the togglemode will get false and the theme will become light 
  }

  const handleSubmit = () => {
    addTodo();
  };

  return (
    <div className="createTodo-container" >
<div className="dark&lightMode">
 <input className="darkmode-checkbox" type="checkbox" name="checkbox" id="darkmodeonoff" onChange={handleSelectMode} checked={toggleDarkMode}/>
    <label className="darkMode-lable" style={{background:toggleDarkMode ? "white":""}} htmlFor="darkligthmode">
      <span className="darkMode-iconsSpan">
          <IoIosMoon size={20} color="#f1c40f"/>
          <FaSun color="#f1c40f"/>
        </span>
        <button className="ball" onClick={handleSelectMode}></button>
    </label>
</div>

      <h1 className="createTodo-h1">
        Todo List
        <img
          src="https://cdn-icons-png.flaticon.com/128/12166/12166873.png"
          alt="todo icon"
          height="35px"
          width="40px"
        />
      </h1>
      <div className="createTodo-input&btn-div">
        <input
          className="createTodo-input"
          type="text"
          name="name"
          value={inputData.name}
          onChange={(e) =>
            setInputData({
              ...inputData,
              id: editedTodo ? inputData.id : new Date().getTime(),
              name: e.target.value,
            })
          }
        />
        <button className="createTodo-btn" onClick={handleSubmit}>
          {isEditing ? "UPDATE" : "ADD"}
        </button>
      </div>

      <ShowTodos />
    </div>
  );
};
