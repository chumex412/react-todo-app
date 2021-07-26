import React from "react";

const icon = {
  add: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
         <path fill="none" d="M0 0h24v24H0z"/>
         <path fill="#ffffff" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
       </svg>,
  remove: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path fill="#ffffff" d="M19 13H5v-2h14v2z"/>
          </svg> 
};

const AddButton = ({ showForm, setShowForm }) => {

  const changeIcon = showForm ? icon.remove : icon.add;

  return (
    <button className="btn btn-add" onClick={ () => setShowForm(!showForm) }>
       <span className="visually-hidden">Show Form to </span>
       {changeIcon}
       <span className="visually-hidden"> More task</span>
    </button>
  );
}

export default AddButton;