import "./App.css";
import {  Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import TaskState from "./context/tasks/TaskState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);

    }, 2000);
  }
  return (
    <>
    <TaskState>
  
      <Navbar />
      <Alert alert={alert} />


      <div className="container">
     
      <Routes>
        <Route exact path="/" element={<Home  showAlert={showAlert}/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
      </Routes>
      </div>
          
    </TaskState>
    </>
  );
}

export default App;