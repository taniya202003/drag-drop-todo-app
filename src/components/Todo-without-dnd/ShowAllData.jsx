import React, { useContext } from "react";
import { ContextProvider } from "../../context/Context";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const ShowAllData = () => {
    const { editData, deleteData, tasksData } = useContext(ContextProvider);

  const handleEdit = (id) => {
    editData(id);
  };

  const handleDelete = (id) => {
    deleteData(id);
  };

  return (
    <div className="allData-container">
          <div className="allData-grid-div" >
            <div className="allData-card-div">
                <h4 className="allData-card-heading">TODO</h4>
                <div className="allData-map-div">
                {tasksData.map((el) => (
            <div className="allData-card-div" key={el.id}>
                <div className="allData-todo-div">
              <div className="allData-todo">
              {el.task}
              </div>
              <div className="allData-btn-div">
              <div className="allData-td">
                <button
                  className="allData-edit-btn"
                  onClick={() => handleEdit(el.id)}
                >
                <FaEdit size={15}/>
                </button>
              </div>
              <div className="allData-td">   
                <button
                  className="allData-delete-btn"
                  onClick={() => handleDelete(el.id)}
                >
                  <MdDelete size={15}/>
                </button>
              </div>
              </div>
              </div>
            </div>
             ))}
             </div>
            </div>  
          </div>
    </div>
  );
};

