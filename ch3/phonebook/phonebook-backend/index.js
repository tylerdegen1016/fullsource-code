const express = require("express")
const cors = require("cors")

const app = express()

const dotenv = require('dotenv').config()
const Person = require("./models/person")

const morgan = require("morgan")
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
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

app.get('/api/people', (request, response) => {
  console.log("getting people")
  Person.find({}).then(people => {
    console.log("got people", people)
    response.json(people)
  })
})

app.get("/api/people/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post("/api/people", (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'name or number missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
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


