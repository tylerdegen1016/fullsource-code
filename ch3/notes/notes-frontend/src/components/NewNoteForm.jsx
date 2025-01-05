const NewNoteForm = ({onSubmit, inputVal,onChange}) => {
    return(
        <>
        <form onSubmit={onSubmit}>
            <input value={inputVal} onChange={onChange}/>
            <button type="submit">Save</button>
        </form>
        </>
    )
}

export default NewNoteForm