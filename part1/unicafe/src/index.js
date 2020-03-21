import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Title = ({ title }) => <h1>{title}</h1>;

const Statistics = ({ stats }) => {
  const [good, neutral, bad] = stats;
  const all = stats.reduce((acc, curr) => acc + curr);
  const avgScore = () => (all === 0 ? 0 : (good - bad) / all);
  const positive = () => (all === 0 ? 0 : (good * 100) / all);

  if (all === 0) return <p>No feedback given</p>;

  return (
    <table>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{all}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{avgScore()}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{positive()} %</td>
      </tr>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title title="give feedback" />
      <Button text="good" handleClick={() => setGood(current => current + 1)} />
      <Button
        text="netural"
        handleClick={() => setNeutral(current => current + 1)}
      />
      <Button text="bad" handleClick={() => setBad(current => current + 1)} />
      <Title title="statistics" />
      <Statistics stats={[good, neutral, bad]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
