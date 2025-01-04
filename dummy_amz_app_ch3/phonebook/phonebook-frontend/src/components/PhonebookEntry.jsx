import personService from '../services/persons'


const PhonebookEntry = ({person, deleteNumber}) => {
    return (
      <p>{person.name}: {person.number} <button onClick={() => deleteNumber(person.id)}>Delete</button></p> 
    )
  }

  export default PhonebookEntry