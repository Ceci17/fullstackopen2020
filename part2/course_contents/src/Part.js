import React from "react";

const Part = ({ name, exercise }) => {
  return (
    <p>
      <span>{name}</span> <span>{exercise}</span>
    </p>
  );
};

export default Part;
