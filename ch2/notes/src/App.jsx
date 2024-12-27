import Note from '../components/Note'
//ch2/notes/components/Note.js

const App = ({notes}) => {

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
         <Note note={note} key={note.id} />
        )}
      </ul>
    </div>
  )
}

export default App