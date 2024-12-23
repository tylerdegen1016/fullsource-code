import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const incremenentCounterByOne = () => {
    setCounter(counter + 1)
  }

  console.log("rendering")
  return (
    <>    
      <div>{counter}</div>
      <button onClick={incremenentCounterByOne}>plus</button>
      <button onClick={() => setCounter(0)}>zero</button>
    </>

  )
}

export default App