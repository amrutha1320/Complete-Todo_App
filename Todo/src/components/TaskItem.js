import React,{useContext} from "react";
import TaskContext from "../context/tasks/TaskContext";


function TaskItem(props) {
  const context = useContext(TaskContext);
  const { deleteTask} = context;
 

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title">{props.task.title}</h5>
            <i className="fa fa-trash-o mx-2" onClick={()=>{deleteTask(props.task._id);props.showAlert("Deleted Successfully","success")}}></i>
            <i className="fa fa-pencil-square-o mx-2" onClick={()=>{props.updateTask(props.task)}}></i>
          </div>
          <p className="card-text"> {props.task.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
