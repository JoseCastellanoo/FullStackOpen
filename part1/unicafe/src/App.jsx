import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all > 0 ? roundToTwo((good - bad) / all) : 0;
  const positive = all > 0 ? roundToTwo((good / all) * 100) : 0;

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good:" value={good} />
        <StatisticLine text="Neutral:" value={neutral} />
        <StatisticLine text="Bad:" value={bad} />
        <StatisticLine text="All:" value={all} />
        <StatisticLine text="Average:" value={average} />
        <StatisticLine text="Positive:" value={`${positive} %`} />
      </tbody>
    </table>
  );
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const roundToTwo = (num) => {
  return Math.round(num * 100) / 100;
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
