const express = require("express")
const cors = require("cors")

const app = express()

const morgan = require("morgan")
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

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






const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("port " + PORT)
})