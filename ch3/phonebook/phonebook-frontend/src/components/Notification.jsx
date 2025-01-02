const Notification = ({message}) => {

    var style = {
        color:"green",
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

export default Notification