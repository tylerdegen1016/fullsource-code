import CountrySummary from "./CountrySummary"

const CountryList = ({countries}) => {
    return(
        <div>
        {countries.map(c => <CountrySummary key={c.name.common} country={c} />)}
        </div>
    )
}

export default CountryList

// import PhonebookEntry from "./PhonebookEntry"

// const Phonebook = ({persons, deleteNumber}) => {
//     return(
//       <div>
//         {persons.map(person => <PhonebookEntry person={person} key={person.name} deleteNumber={deleteNumber}/>)}
//       </div>
//     )
//   }

//   export default Phonebook