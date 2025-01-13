import { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

import axios from 'axios'
import ErrorMessage from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchterm, setSearchterm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState("hi")
  const [errorMessage, setErrorMessage] = useState("error")


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
      
      var updateNumber = confirm(`${newName} is already in there. Want to update number?`)
      if (updateNumber){
        const personObject = persons.find(p => p.name == newName)
        const updatedPersonObject = {...personObject, number: newNumber}
        personService.update(personObject.id, updatedPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === personObject.id ? updatedPersonObject : person))
            setFilteredPersons(persons.map(person => person.id === personObject.id ? updatedPersonObject : person))
            
          })
          .catch(error => {
            setErrorMessage("ERROR!")
            setTimeout( () => {
              setErrorMessage(null)
            },5000)
            console.log(error)
          })
      } else {
        //todo
      }
    } 
    else 
    {
      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
      
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        if (newName.toLowerCase().includes(searchterm)) {
          setFilteredPersons(filteredPersons.concat(personObject))
        }
        setNewName("")
        setNewNumber("")

        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout( () => {
          setNotificationMessage(null)
        },5000)
      })
    }
  }

  const deleteNumber = (id) => {
    personService
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(p => p.id != id))
        setFilteredPersons(filteredPersons.filter(p => p.id != id))
      })
      .catch(error => {
        alert("ERROR!!")
        console.log(error)
      })

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
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
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
      <Phonebook persons={filteredPersons} deleteNumber={deleteNumber} />
    </div>
  )
}

export default App