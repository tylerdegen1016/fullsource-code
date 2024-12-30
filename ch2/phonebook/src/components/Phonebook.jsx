import PhonebookEntry from "./PhonebookEntry"

const Phonebook = ({persons, deleteNumber}) => {
    return(
      <div>
        {persons.map(person => <PhonebookEntry person={person} key={person.name} deleteNumber={deleteNumber}/>)}
      </div>
    )
  }

  export default Phonebook