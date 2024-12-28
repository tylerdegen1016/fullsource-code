import { useState } from 'react'

const Phonebook = ({persons}) => {
  return(
    <div>
      {persons.map(person => <PhonebookEntry person={person} key={person.name}/>)}
    </div>
  )
}

const PhonebookEntry = ({person}) => {
  return (
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      id: String(persons.length + 1)
    }

    setPersons(persons.concat(personObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Phonebook persons={persons} />
    </div>
  )
}

export default App