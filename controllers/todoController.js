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
  console.log(req.body)
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
  const todoToUpdate = Todo.findById(id)
  if (!todoToUpdate) return res.status(404).send('To do not found...')
  const updates = JSON.parse(Object.keys(req.body)[0])
  console.log(updates)
  if (updates.hasOwnProperty('completed')) {
    const completeChange = !JSON.parse(updates['completed'])
    console.log(completeChange)
    updates['completed'] = completeChange
    console.log(updates)
  }
  Todo.findByIdAndUpdate(id, updates)
    .then((result) => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}
// const todo_complete_task = (req, res) => {
//   const updates = JSON.parse(Object.keys(req.body)[0])

//   console.log(updates)
//   const id = updates['_id']
//   console.log(id)
//   // const id = req.params.id
//   const todo = Todo.findById(id)
//   if (!todo) return res.status(404).send('To do not found...')
//   const complete = !JSON.parse(updates['completed'])
//   console.log(complete)

//   Todo.findByIdandUpdate(id, { completed: complete })
//     .then((result) => {
//       res.redirect('/')
//     })
//     .catch((err) => {
//       console.log('here')
//       console.log(err)
//     })
// }

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
  todo_delete,
}
