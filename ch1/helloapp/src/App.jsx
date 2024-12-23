const Hello = ({name,age}) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old and were born in {bornYear()}
      </p>
    </div>
  )
}

const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )

  // const name = 'Peter'
  // const age = 10

  // return (
  //   <div>
  //     <h1>Greetings</h1>
  //     <Hello name="Maya" age={26 + 10} />
  //     <Hello name={name} age={age} />
  //   </div>
  // )
}

export default App