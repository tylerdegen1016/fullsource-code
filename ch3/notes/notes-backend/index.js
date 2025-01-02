const http = require("http")
const express = require('express')

app = express()
app.use(express.json())

//middleware
const requestLogger = (request, response, next) => {
    console.log("method ", request.method)
    console.log("path ", request.path)

    console.log("body ", request.body)

    next()
}

app.use(requestLogger)



let notes = [
  { id: "1", content: "HTML is easy", important: true },
  { id: "2", content: "Browser can execute only JavaScript", important: false },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get('/', (request, response) => {
    response.send("<h1>HI!!</h1>")
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0
    return String(maxId + 1)
}

app.post("/api/notes", (request, response) => {
    if (!body.content) {
        return response.status(400).json({
            error:"content missing"
        })
    }

    const note = {
        content: body.content,
        important: Boolean(body.imporant) || false,
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

  //after routes so catch requests to nonexistent routes
  const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "Unknown endpoint"})
    app.use(unknownEndpoint)
  }


const PORT = 3002
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})
