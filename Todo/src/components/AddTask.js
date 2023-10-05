import React, { useState, useContext } from "react";
import TaskContext from "../context/tasks/TaskContext";

function AddTask(props) {
  const context = useContext(TaskContext);
  const { addTask } = context;
  const [task, setTask] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addTask(task.title, task.description, task.tag);
    setTask({ title: "", description: "", tag: "" });
    props.showAlert("Task Added Successfully","success")
    
  };
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3 mx-3">
      <h2>Add a Task To-do</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={onChange}
            value={task.title}
            type="text"
            className="form-control"
            id="title"
            name="title"
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
            id="description"
            name="description"
            value={task.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={task.tag}
          />
        </div>
        <button disabled={task.title.length<3 || task.description.length<5} onClick={handleClick} type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
