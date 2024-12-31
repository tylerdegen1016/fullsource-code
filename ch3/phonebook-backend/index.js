console.log("HI!")
const express = require("express")
const app = express()

app.use(express.json())

let people = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/people", (req, res) => {
    res.json(people)
})

app.get("/info", (req, res) => {
    res.send(
        `<p>Phonebook has info for ${people.length} people</p>
        
        <p>Date here</p>`
    
    )
})

app.get("/api/people/:id", (req, res) => {
    const id = req.params.id
    const person = people.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete("/api/people/:id", (req, res) => {
    const id = req.params.id
    people = people.filter(person => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    const maxId = people.length > 0
      ? Math.max(...people.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/people', (request, response) => {
    const body = request.body
  
    error = false
    errorMessage = ""
    if (!body.name){
        error = true
        errorMessage += "name missing"
    }
    if (!body.number){
        error = true
        errorMessage += "number missing"
    }
    if(people.some(p => p.name === body.name)){
        error = true
        errorMessage += "person already in there"
    }
    if (error){
        return response.status(400).json({
          error: errorMessage,
        });
    }

  
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
  
    people = people.concat(person)
  
    response.json(person)
  })




let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];



app.get("/api/notes", (req, res) => {
    res.json(notes)
})

app.get("/api/notes/:id", (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)
    
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
})

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})


  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log("port")
})