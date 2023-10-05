import React, { useContext, useEffect, useRef, useState } from "react";
import TaskContext from "../context/tasks/TaskContext";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";
import {useNavigate} from "react-router-dom";

function Tasks(props) {
  let navigate = useNavigate();
  const context = useContext(TaskContext);
  const [task, setTask] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const { tasks, getTasks,editTask } = context;

  useEffect(() => {
    if(localStorage.getItem("auth-token"))
    {
      getTasks();
   
      
    }
    else{
      navigate({pathname:"/login"});
    }
   
    // eslint-disable-next-line
  }, []);

  const updateTask = (currentTask) => {
    ref.current.click();
    setTask({id:currentTask._id,etitle:currentTask.title,edescription:currentTask.description,etag:currentTask.tag});
    
 

  };

  const ref = useRef(null);
  const refClose=useRef(null);

  const handleClick = (e) => {
    console.log("Updating the Task",task)
    editTask(task.id,task.etitle,task.edescription,task.etag);
    refClose.current.click();
    props.showAlert("Updated Succesfully","success");
  };
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddTask showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    minLength={3}
                    onChange={onChange}
                    value={task.etitle}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    onChange={onChange}
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={task.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    minLength={5}
                    onChange={onChange}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={task.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button  disabled={task.etitle.length<3 || task.edescription.length<5}  type="button" className="btn btn-primary" onClick={handleClick} >
                Update Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 mx-3">
        <h2>Your Tasks</h2>
        <div className="container">
        {tasks.length===0 &&"No Task to Display"}
        </div>
  
        {tasks.map((task) => {
          return (
            <TaskItem key={task._id} task={task} updateTask={updateTask} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
}

export default Tasks;
