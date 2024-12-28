import PhonebookEntry from "./PhonebookEntry"

const Phonebook = ({persons}) => {
    return(
      <div>
        {persons.map(person => <PhonebookEntry person={person} key={person.name}/>)}
      </div>
    )
  }

  export default Phonebook