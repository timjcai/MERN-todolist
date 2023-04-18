const Todo = require('../models/todo')

const todo_index = (req, res) => {
  Todo.find()
    .then((result) => {
      res.render('todos/index', { title: 'All Todos', todos: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const todo_details = (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then((result) => {
      res.render('todos/details', { title: 'Todo', todos: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const todo_create_post = (req, res) => {
  // get information from create page
  const todo = new Todo(req.body)
  // save information to database
  todo
    .save()
    .then((result) => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

const todo_delete = (req, res) => {
  const id = req.params.id
  console.log(id)
  Todo.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/todos' })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  todo_index,
  todo_details,
  todo_create_post,
  todo_delete,
}
