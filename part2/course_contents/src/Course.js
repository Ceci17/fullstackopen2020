import React from "react";
import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      {course.parts.map(part => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
      <Total exercises={course.parts} />
    </div>
  );
};

export default Course;
