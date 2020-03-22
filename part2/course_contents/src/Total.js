import React from "react";

const Total = ({ exercises }) => {
  return (
    <strong>
      total{" "}
      {exercises
        .map(part => part["exercises"])
        .reduce((acc, curr) => acc + curr)}
    </strong>
  );
};

export default Total;
