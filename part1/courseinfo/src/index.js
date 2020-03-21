import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ part: { name, exercises } }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ exercises }) => {
  console.log("PART", exercises);
  return (
    <p>
      Number of exercises{" "}
      {exercises.map(p => p.exercises).reduce((acc, curr) => acc + curr)}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  };
  const part3 = {
    name: "State of a component",
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content part={part1} />
      <Content part={part2} />
      <Content part={part3} />
      <Total exercises={[part1, part2, part3]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
