import React, { useState } from "react";


const Todo = ({
   id, 
   name, 
   completed, 
   deleteTask, 
   toggleTaskCompleted, 
   changeName 
}) => {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    changeName(id, newName);
    setNewName("");
    setEditing(false);

  }

  const editTemplate = (
    <form className="stack-group stack-group--horizontal" onSubmit={handleSubmit}>
      <div className="form-group form-group--vertical">
        <label className="h5" htmlFor={id}>New name for {name}</label>
        <input type="text" className="input-text" name={newName} id={id} onChange={ (e) => setNewName(e.target.value) } />
      </div>

      <div className="btn-group">
        <button type="button" className="btn btn-todo btn-warning" onClick={ () => setEditing(false) }>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none" opacity=".9"/>
            <path fill="#D1C12C" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm4-13l-4 4-4-4-1 1 4 4-4 4 1 1 4-4 4 4 1-1-4-4 4-4z"/>
          </svg>
          <span className="visually-hidden"> {name}</span>
        </button>

        <button type="submit" className="btn btn-todo btn-success">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path fill="#1DD640" d="M9 16l-4-4-2 1 6 6L21 7l-1-1L9 16z"/>
          </svg>
          <span className="visually-hidden"> {name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className="stack-group stack-group--horizontal">
      <div className="form-group">
        <input type="checkbox" name={name} id={id} defaultChecked={completed} onChange={ () => toggleTaskCompleted(id) } />
        <label className="parag" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn btn-todo btn-primary" onClick={ () => setEditing(true) }> 
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
             <path d="M0 0h24v24H0V0z" fill="none"/>
             <path fill="#5b78ff" d="M14 9l1 1-9 9H5v-1l9-9m3.7-6a1 1 0 00-.7.3L15 5 19 9 20.7 7c.4-.3.4-1 0-1.4l-2.3-2.3a1 1 0 00-.7-.3zM14 6.2L3 17.2V21h3.8l11-11-3.7-3.8z"/>
           </svg>
           <span className="visually-hidden">{name}</span>
        </button>
        <button type="button" className="btn btn-todo btn-danger" onClick={ () => deleteTask(id) }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path fill="#F72130" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8a2 2 0 002-2V7z"/>
            </svg>
            <span className="visually-hidden"> {name}</span>
        </button>
      </div>
    </div>
  )

  return (
    <li className="todo-item">
      {isEditing ? editTemplate : viewTemplate}
    </li>
  )
}

export default Todo