const mongoose = require("mongoose")

if (process.argv.length<3) {
    console.log("give password as arg")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tddegen:${password}@cluster0.sb552.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

//mongodb+srv://tddegen:d7xuk7KhFH8pz7Yr@cluster0.sb552.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose.set("strictQuery", false)

mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length == 3) {
    console.log("reach to server")
    Person.find().then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
    const name = process.argv[3]
    const number = process.argv[4]
    
    
    const person = new Person({
        name, number
    })
    
    person.save().then(result => {
        console.log(`Added ${name} ${number} to phonebook`)
        mongoose.connection.close()
    })
}



// Note.find({important: true}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })
