import {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'
//ch2/notes/components/Note.js

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note")
  const [showAll, setShowAll] = useState(true)

  // const hook = () => {
  //   console.log("effect")
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }
  // }

  // useEffect(hook, [])
  useEffect(() => {
    console.log("effect")
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log("promise fulfilled")
        setNotes(response.data)
      })
  }, [])

  console.log("render", notes.length, "notes")
  

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }

    setNotes(notes.concat(noteObject))
    setNewNote("")
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
         <Note note={note} key={note.id} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App