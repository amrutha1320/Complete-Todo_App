import React, { useState } from "react";
import TaskContext from "./TaskContext";

const TaskState = (props) => {
  const host = "http://localhost:5000";
  const intialTask = [];

  const [tasks, setTasks] = useState(intialTask);

  const getTasks = async () => {
    // Api Call
    const response = await fetch(`${host}/api/tasks/fetchalltasks`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();

    setTasks(json);
  };

  const addTask = async (title, description, tag) => {
    // Api Call
    const response = await fetch(`${host}/api/tasks/addtask`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const task = await response.json();

   
    setTasks(tasks.concat(task));
  };

  const deleteTask = async (id) => {
    // Api Call
    const response = await fetch(`${host}/api/tasks/deletetask/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();

    const newTask = tasks.filter((task) => {
      return task._id !== id;
    });
    setTasks(newTask);
  };

  const editTask = async (id, title, description, tag) => {
    // Api Call
    const response = await fetch(`${host}/api/tasks/updatetask/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("auth-token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newTask = JSON.parse(JSON.stringify(tasks));

    for (let index = 0; index < newTask.length; index++) {
      const element = tasks[index];
      if (element._id === id) {
        newTask[index].title = title;
        newTask[index].description = description;
        newTask[index].tag = tag;
        break;
      }
    }
    setTasks(newTask);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, addTask, deleteTask, editTask, getTasks }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
