const App = () => {
  console.log("hi from comp")
  const now = new Date()
  const a = 10
  const b = 20
  const name = "tayty"
  const age = 10

  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  console.log(now, a+b)
  return (
    <div>
      <p>Hello world at {now.toString()}</p>
      <p>{a} + {b} = {a+b}</p>
      <Hello name={name} age={age}></Hello>
      <Hello name={friends[0].name} age={friends[0].age}></Hello>
      <HelloFriend friend={friends[1]}></HelloFriend>
    </div>

  )
}

const Hello = (props) => {
  return(
    <>
      <h1>HI</h1>
      <p>Hello {props.name} you are {props.age} yo</p>
    </>
  )
}

const HelloFriend = (props) => {
  return(
    <>
      <h1>HI</h1>
      <p>Hello {props.friend.name} you are {props.friend.age} yo</p>
    </>
  )
}

export default App