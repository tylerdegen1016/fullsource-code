import { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import personService from './services/persons'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchterm, setSearchterm] = useState('')

  useEffect(() => {

    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons.filter(p => p.name.includes(searchterm)))
    })
  }, [])


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

      <div><Filter value={searchterm} onChange={filterPersons} /> </div>
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