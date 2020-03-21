import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([]);
  const [max, setMax] = useState(0);
  const [anecdote, setAnecdote] = useState(null);

  const nextAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const voteForAnecdote = () => {
    setVote([...vote, anecdotes[selected]]);
  };

  const reducer = (vote, selected) => {
    if (!vote[selected]) {
      vote[selected] = 1;
    } else {
      vote[selected] = vote[selected] + 1;
    }
    return vote;
  };

  const numberOfVotes = vote.reduce(reducer, {});

  for (let [key, value] of Object.entries(numberOfVotes)) {
    if (value > max) {
      setMax(value);
      setAnecdote(key);
    }
  }

  console.log();

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>
        {numberOfVotes[anecdotes[selected]] !== undefined
          ? `has ${numberOfVotes[anecdotes[selected]]} votes`
          : `has 0 votes`}
      </p>
      <button onClick={voteForAnecdote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <p>{anecdote}</p>
      {max !== 0 && <p>has {max} votes</p>}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById("root")
);
