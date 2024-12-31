import CountrySummary from "./CountrySummary"

const CountryList = ({countries, setSearchTerm}) => {
    return(
        <div>
        {countries.map(c => {
            return(
                <>
                <CountrySummary key={c.name.common} country={c} />
                <button onClick={() => setSearchTerm(c.name.common)}>show</button>    
                </>
                      
            )
            })}
        </div>
    )
}

export default CountryList

