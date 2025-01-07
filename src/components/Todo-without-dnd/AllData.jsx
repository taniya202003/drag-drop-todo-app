import React, { useContext } from "react";
import "../../assets/allData.css";
import { ContextProvider } from "../../context/Context";
import { ShowAllData } from "./ShowAllData";

export const AllData = () => {

  const { addData, inputData, setInputData} =
    useContext(ContextProvider);

  const handleSubmit = () => {
    addData();
  };

  return (
    <div className="allData-container">
      <h1>My Tasks ✅</h1>
      <span className="allData-span">
        <input
          className="allData-input"
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button className="allData-add-btn" onClick={handleSubmit}>
          Add Task
        </button>
      </span>
      <ShowAllData/>
    </div>
  );
};
