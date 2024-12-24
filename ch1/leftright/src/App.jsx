import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(  
  <button onClick={handleClick}>
    {text}
  </button>)
}

const Button2 = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <div>{props.value}</div>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [value, setValue] = useState(0)

  const handleClick = () => {
    console.log("clicked")
  }

  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  const denseHello = (who) => {
    return () => {
      console.log("hello", who)
    }
  }

  const setToValue = (newValue) => () => setValue(newValue)

  const handleLeftClick = () => { 
    setAll(allClicks.concat('L')); 
    const updatedLeft = left + 1
    setLeft(updatedLeft) 
    setTotal(updatedLeft+right) 
  }
  const handleRightClick = () => { 
    setAll(allClicks.concat('R')); 
    const updatedRight = right + 1
    setRight(updatedRight)  
    setTotal(left+updatedRight)
  }

  return (
    <div>
      <Display value={value} />
      <button onClick={hello('world')}>Closure stuff</button>
      {left}
      <Button handleClick={handleClick} text="handleClick"/>
      <Button handleClick={handleLeftClick} text='LLeft' />
      <Button handleClick={handleRightClick} text='RRight' />
      {right}
      <History allClicks={allClicks} />
      <button onClick={setToValue(1000)}>thousand</button>
      <br/>
      <Button2 handleClick={() => setToValue(value+1)} text="increment"/>
    </div>
  )
}

export default App
