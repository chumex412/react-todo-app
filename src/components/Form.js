import React, { useState } from "react";


const Form = ({addTask}) => {

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(name);
    setName("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2 className="todo-header h3">
        Decide what to do today
      </h2>

      <input
        type="text" 
        value={name} 
        name={name} id="" 
        className="input"
        onChange={(e) => setName(e.target.value)} 
      />
      <div>
        <button className="btn" type="submit">Add</button>
      </div>
    </form>
  )
}

export default Form