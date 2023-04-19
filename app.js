const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todoRoutes')

// express app
const app = express()

// mongoDB connection

const dbURI =
  'mongodb+srv://tester:adsfkj129hfkjasdf0123ug@cluster0.jqvaast.mongodb.net/to-do-app?retryWrites=true&w=majority'
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.static('styles'))
app.use(express.urlencoded({ extended: true }))

app.use('/', todoRoutes)
