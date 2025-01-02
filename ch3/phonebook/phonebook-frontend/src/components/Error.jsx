const ErrorMessage = ({message}) => {

    var style = {
        color:"red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid"
    }

    if (message === null) {
        return null
    }

    return(
        <div style={style}>
            {message}
        </div>
    )
}

export default ErrorMessage