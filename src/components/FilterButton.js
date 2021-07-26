import React from "react";


const FilterButton = ({name, icon, isPressed, setFilter}) => {

  const styleCond = name === "All" ? "#5b78ff" : name === "Active" ? "#2b3975" : "#1DD640";

  const btnColor = {borderColor: styleCond}

  return (
    <button type="button" style={btnColor} className="btn" aria-pressed={isPressed} onClick={() => setFilter(name)}>
      {icon}
      <span className="visually-hidden">Show </span>
      <span className="visually-hidden">{name}</span>
      <span className="visually-hidden"> Task</span>
    </button>
  );
}

export default FilterButton;