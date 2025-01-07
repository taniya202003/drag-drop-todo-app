import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <h1>welcome</h1>
      <div>
        <button className="mr-10 p-3" onClick={() => navigate("/createtask")}> Todo with DND </button>
        <button className="mr-10 p-3" onClick={() => navigate("/alldata")}> Todo without DND </button>
        <button className=" p-3" onClick={() => navigate("/createtodo")}> Practice Todo with DND </button>
      </div>
    </div>
  );
};
