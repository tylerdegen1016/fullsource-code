const http = require("http")
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const Note = require("./models/note")

app = express()
app.use(express.json())
app.use(express.static("dist"))
app.use(cors())

const mongoose = require('mongoose')

const password = process.argv[2]

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = process.env.MONGODB_URI;
console.log("url",url)
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


//middleware
const requestLogger = (request, response, next) => {
    console.log("method ", request.method)
    console.log("path ", request.path)

    console.log("body ", request.body)

    next()
}

app.use(requestLogger)



// let notes = [
//   { id: "1", content: "HTML is easy", important: true },
//   { id: "2", content: "Browser can execute only JavaScript", important: false },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

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
