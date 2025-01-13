const CountryDetailed = ({country}) => {
    return(
        <>
        <p>{country.name.common}</p>
        <p>
            <img src={country.flags.png} />
        </p>
        </>
    )
}

export default CountryDetailed