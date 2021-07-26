import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import AddButton from "./components/AddButton";
//import {nanoid} from "nanoid";
//import logo from './logo.svg';
import './App.css';
import FilterButton from "./components/FilterButton";

// Declaring Filter datas
const FILTER_DATA = {
  All: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
           <path d="M0 0h24v24H0V0z" fill="none"/>
           <path fill="#5b78ff" d="M21 3H3L1 5v14l2 2h18l2-2V5l-2-2zm0 16H3V5h18v14zm-11-7H8l4-4 4 4h-2v4h-4v-4z"/>
         </svg>,
    filter: () => true
  },
  Active: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
           <path fill="none" d="M0 0h24v24H0z"/>
           <path fill="#2b3975" d="M17 11l-4-4 1-1 3 2 4-4 1 1-5 6zm-6-4H2v2h9V7zm10 6l-1-1-3 3-3-3-1 1 3 3-3 3 1 1 3-3 3 3 1-1-3-3 3-3zm-10 2H2v2h9v-2z"/>
         </svg>,
    filter: task => !task.completed,
  },
  Completed: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
           <path d="M0 0h24v24H0V0z" fill="none"/>
           <path fill="#1DD640" d="M18 7l-1-1-7 6 2 1 6-6zm4-1L12 16l-5-4-1 1 6 6L24 7l-2-1zM0 13l6 6 1-1-5-6-2 1z"/>
         </svg>,    
    filter: task => task.completed 
  }
}

// Get object keys
const FILTER_NAME = Object.keys(FILTER_DATA);

function App() {

  // Declaring state
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  // Calling useEffect 
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();

      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  // Fetch task from server
  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks`);
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // Add task
  const addTask = async (name) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json" 
      },
      body: JSON.stringify({name: name, completed: false})
    });

    const newTask = await res.json();

    setTasks([...tasks, newTask]);

    //const newTask = {id: `id-${nanoid()}`, name: name, completed: false};
    //setTasks([...tasks, newTask]);
  }

  // Delete task
  const deleteTask = async (id) => {
     await fetch(`http://localhost:5000/tasks/${id}`, {
       method: "DELETE"
     });

    const remainingTask = tasks.filter(task => id !== task.id);
    setTasks(remainingTask);
  }

  // Change name of todo item
  const changeName = async (id, newName) => {

    const editName = await fetchTask(id);
    const updTask = {...editName, name: newName};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data = await res.json();

    const editedName = tasks.map(task => (
      id === task.id ? {...task, name: data.name} : task
    ));
    //const editedName = tasks.map(task => {
    //  if(id === task.id) {
    //    return { ...task, name: newName }
    //  }

    //  return task
    //})

    setTasks(editedName);
  }

  // Toggle task on or off when completed
  const toggleTaskCompleted = async (id) => {
    
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle, completed: !taskToToggle.completed};

    // Fetch task from api
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    });

    // Parse json data
    const data = await res.json();

    const completedTask = tasks.map(task => (
      id === task.id ? {...task, completed: data.completed} : task
    ));

    setTasks(completedTask);
    
    //const completedTask = tasks.map(task => {
    //  if(id === task.id) {
    //    return {...task, completed: !task.completed};
    //  }
    //  return task;
    //})
  }

  // Loop through the given todo-item
  const taskList = tasks.filter(FILTER_DATA[filter].filter).map(task => (
    <Todo 
      id={task.id}
      key={task.id}
      name={task.name}
      completed={task.completed}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      changeName={changeName}
    />
  ));

  // Filter element rendering
  const filteredList = FILTER_NAME.map(name => (
    <FilterButton
      key={name}
      name={name}
      icon={FILTER_DATA[name].icon}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // Condition list-header rendering
  const taskNoun = taskList.length === 1 ? "task" : "tasks";
  const listHeader = taskList.length <= 0 ? "No task available: Add new task" : `${taskList.length} ${taskNoun} remaining`;

  // Condition to show form
  const toggleButton = showForm ? <Form addTask={addTask} /> : "";

  return (
    <div className="todo-app">
      <header className="header">
        <h1 className="h2">Todo list</h1>
        {toggleButton}
      </header>
      <div className="btn-filter-group">
        { filteredList }
      </div>
      <section className="todo-content">
        <h2 className="list-header h3">{ listHeader }</h2>
        <ul className="todo-list">
          {taskList}
        </ul>
      </section>

      <AddButton showForm={showForm} setShowForm={setShowForm} />
    </div>
  );
}

export default App;
