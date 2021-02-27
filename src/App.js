import React, {useState} from "react";
import { Button } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import "./App.css";

import logo from './todolist.png';

const data = [];

const Header = () => {
  return <h1>TO DO LIST <img className="logo" src={logo}/></h1>
}

const InfoBar = ({taskNumber}) => {
  return <div>Ada {taskNumber} task(s) yang perlu dikerjakan.</div>
}

const TaskAdder = ({setTasks, tasks}) => {
  const [currentValue, setCurrentValue] = useState('');
  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      message: currentValue
    }
    setTasks([...tasks, newTask]);
    setCurrentValue('');
  }

  return <div className="task-adder">
    <TextField value={currentValue} onChange={event => setCurrentValue(event.target.value)} label="Tambah task" variant="outlined" />
    <Button variant="contained" color="primary" disabled={currentValue === ''} onClick={() => handleAddTask()}>Tambah</Button>
  </div>
}

const Task = ({message, id, tasks, setTasks}) => {
  const handleDelete = () => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }
  return <div className="container-task">
    <div className="task">
      <div style={{display: "inline-block"}}>{message}</div>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<DeleteIcon />}
        onClick={() => handleDelete()}
      >
        Delete
      </Button>
    </div>
  </div>
}

const TaskList = ({tasks, setTasks}) => {
  return tasks.map(task => {
    return <Task message={task.message} id={task.id} setTasks={setTasks} tasks={tasks} />
  })
}

const TaskApp = () => {
  const [tasks, setTasks] = useState(data);
  return <div className="container">
   <div className="box">
    <Header />
    <InfoBar taskNumber={tasks.length} />
    <TaskAdder setTasks={setTasks} tasks={tasks} />
    <TaskList tasks={tasks} setTasks={setTasks} />
   </div>
  </div>
}

const App = () => {
  return <TaskApp />
}

export default App;