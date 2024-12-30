const Notification = ({message}) => {

    var style = {
        color:"green",
        background: "lightgrey",
        font-size: "20px",
        border-style: "solid"
    }

    if (message === null) {
        return null
    }

    return(
        <div style={style}>

        </div>
    )
}