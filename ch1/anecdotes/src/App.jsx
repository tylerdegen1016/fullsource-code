import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const NextButtonAnecdote = ({handleClick}) => {
  return(<button onClick={handleClick}>
    Next
    </button>)
}

const VoteButton = ({handleClick}) => {
  return(<button onClick={handleClick}>
    Vote
    </button>)
}

const App = () => {
  const generateRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const nextAnecdote = () => {
    const maxBound = anecdotes.length - 1
    const randomNumber = generateRandomInt(0,maxBound)
    console.log(randomNumber)
    setSelected(randomNumber)
  }

  const tallyVote = () => {
    setVotes(prevVotes => {
      const updatedVotes = [...prevVotes];
      updatedVotes[selected] += 1;
      return updatedVotes;
    })
  }

   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      {anecdotes[selected]}
      <NextButtonAnecdote handleClick={nextAnecdote}/>
      <VoteButton handleClick={tallyVote}/> 
      <p>Current vote is {votes[selected]}</p>
    </div>
  )
}

export default App
