const PhonebookEntry = ({person}) => {
    return (
      <p>{person.name}: {person.number}</p>
    )
  }

  export default PhonebookEntry