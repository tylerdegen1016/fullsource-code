import { useState } from 'react'

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({onClick, text}) => { 
  return (
    <button onClick = {onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const incremenentCounterByOne = () => {
    setCounter(counter + 1)
  }
  const decreaseCounterByOne = () => setCounter(counter-1)

  console.log("rendering")
  return (
    <>    
      <Display counter={counter}></Display>
      <Button onClick={incremenentCounterByOne} text="plus"></Button>
      <Button onClick={decreaseCounterByOne} text="minus"></Button>

      <Button onClick={() => setCounter(0)} text="zero"></Button>
    </>

  )
}

export default App