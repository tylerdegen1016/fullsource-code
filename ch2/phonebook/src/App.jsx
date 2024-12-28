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
    <p>{person.name}: {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }    
  ]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchterm, setSearchterm] = useState('')


  const addNumber = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name === newName)){
      alert(`${newName} is already in there`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
  
      setPersons(persons.concat(personObject))
      if (newName.toLowerCase().includes(searchterm)) {
        setFilteredPersons(filteredPersons.concat(personObject))
      }

      setNewName("")
      setNewNumber("")
    }


  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterPersons = (event) => {
    let newSearchTerm = event.target.value
    console.log(newSearchTerm)
    setSearchterm(newSearchTerm)
    setFilteredPersons(persons.filter(p => p.name.toLowerCase().includes(newSearchTerm.toLowerCase())))
  }

  return (
    <div>
      <div>search: <input value={searchterm} onChange={filterPersons} /></div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Phonebook persons={filteredPersons} />
    </div>
  )
}

export default App