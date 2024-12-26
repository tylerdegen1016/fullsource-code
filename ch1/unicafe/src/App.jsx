import { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad;
  const average = (good-bad) / all
  const pos = ((good / all) * 100) + "%"

  if (good == 0 && neutral == 0 && bad == 0){
    return (<p>No feedback yet</p>)
  }

  return (
    <div>
      <table>
        <tbody>
        <StatisticsRow text="good" value={good} />
        <StatisticsRow text="neutral" value={neutral} />
        <StatisticsRow text="bad" value={bad} />
        <StatisticsRow text="all" value={all} />
        <StatisticsRow text="average" value={average} />
        <StatisticsRow text="positive" value={pos} />
        </tbody>
      </table>

      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={pos} />
    </div>
  )
}

const StatisticsRow = ({text,value}) => {
  return(<tr><td>{text}</td><td>{value}</td></tr>)
}

const StatisticLine = ({text,value}) => {
  return(<p>{text}: {value}</p>)
}

const Header = ({headerText}) => <h1>{headerText}</h1>;

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Buttons = ({goodHandler, neutralHandler, badHandler}) => {
  return(
    <>
      <Button onClick={goodHandler} text="good"/>
      <Button onClick={neutralHandler} text="neutral"/>
      <Button onClick={badHandler} text="bad"/>
    </>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <>
      <Header headerText="give feedback"/>
      <Buttons goodHandler={()=>setGood(good+1)} neutralHandler={()=>setNeutral(neutral+1)} badHandler={()=>setBad(bad+1)}/>
      <Header headerText="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App