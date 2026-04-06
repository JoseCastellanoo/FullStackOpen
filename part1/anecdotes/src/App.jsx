import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);

  const [point, setPoint] = useState(new Array(anecdotes.length).fill(0)); // utilizo esta forma para crear un array con la misma cantidad de elementos que el array de anecdotas y lo lleno con ceros.

  const addVote = () => {
    const pointCopy = [...point];
    pointCopy[selected] += 1;
    setPoint(pointCopy);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {point[selected]} votes</div>
      <Button handleClick={addVote} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
       text="next anecdote" />

       <h1>Anecdote with most votes</h1>
       <div>{anecdotes[point.indexOf(Math.max(...point))]}</div>
       <div>has {Math.max(...point)} votes</div>
    </div>
    

  )
}

export default App