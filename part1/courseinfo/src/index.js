import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ parts }) => {
  return parts.map(part => (
    <p key={part.name}>
      {part.name} {part.exercises}
    </p>
  ));
};

const Total = ({ exercises }) => {
  return (
    <p>
      Number of exercises{" "}
      {exercises.map(p => p.exercises).reduce((acc, curr) => acc + curr)}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
