const http = require("http")
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const Note = require("./models/note")

app = express()
app.use(express.json())
app.use(express.static("dist"))
app.use(cors())



//middleware
const requestLogger = (request, response, next) => {
    console.log("method ", request.method)
    console.log("path ", request.path)

    console.log("body ", request.body)

    next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
})

app.get('/api/notes', (request, response) => {
    console.log("getting notes")
    Note.find({}).then(notes => {
        console.log("got notes", notes)
        response.json(notes)
      })
})

app.get("/api/notes/:id", (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.post("/api/notes", (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        //implicit return? or what's happening here
        response.json(savedNote)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    // const id = request.params.id
    // notes = notes.filter(note => note.id !== id)

    // response.status(204).end()
    //TODO
    response.status(400).end()
})

  //after routes so catch requests to nonexistent routes
  const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "Unknown endpoint"})
    app.use(unknownEndpoint)
  }


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`)
})
