const Note = ({ note }) => {
    return (
      <li>{note.content} (important: {note.important + ""})</li>
    )
  }
  
  export default Note