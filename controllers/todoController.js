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
      res.render('todos/details', { title: 'Todo', todo: result })
    })
    .catch((err) => {
      console.log(err)
    })
}

const todo_create_task = (req, res) => {
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

const todo_update_task = (req, res) => {
  const id = req.params.id
  const updates = req.body
  console.log(updates)
  Todo.findByIdAndUpdate(id, updates)
    .then((result) => {
      res.json({ redirect: '/todos' })
    })
    .catch((err) => {
      console.log(err)
    })
}
const todo_complete_task = async (req, res) => {
  const id = req.params.id
  const todo = await Todo.findById(id)
  if (!todo) return res.status(404).send('To do not found...')
  const complete = !req.body.completed
  const updateItem = new Todo(complete)

  try {
    const updatedTodo = await Todo.findByIdandUpdate(
      { _id: id },
      {
        completed: complete,
      }
    )
    res.json('category changed')
    res.send(updatedTodo)
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
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
  todo_create_task,
  todo_update_task,
  todo_complete_task,
  todo_delete,
}
