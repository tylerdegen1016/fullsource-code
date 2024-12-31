import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryList from './components/CountryList'
import CountryDetailed from './components/CountryDetailed'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("swit")

  const countriesToShow = countries.filter(country => {return country.name.common.toLowerCase().includes(searchTerm.toLowerCase())})
  console.log(countriesToShow)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
      setCountries(initialCountries)
    })
  }, [])

  //if countries to show > 10, show it's too many
  //if countries to show 1-10, show countries list
  //if county == 1, show country data

  let numCunts = countriesToShow.length
  let content
  if (numCunts > 10) {
    content = <p>too many countries</p>
  }
  else if (numCunts < 10 && numCunts > 1) {
    content = <CountryList countries={countriesToShow} setSearchTerm={setSearchTerm}/>
  }
  else if (numCunts == 1) {
    content = <CountryDetailed country={countriesToShow[0]} />
  }
  else if (numCunts == 0) {
    content = <p>no cunts</p>
  } else {
    content = <p>what the fuck</p>
  }

  return (
    <>
      <div>search: <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/></div>
      {
        content
      }
    </>
  )
}

export default App
