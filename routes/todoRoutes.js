const express = require('express')
const todoController = require('../controllers/todoController')
const router = express.Router()

router.get('/', todoController.todo_index)
router.get('/:id', todoController.todo_details)
router.post('/', todoController.todo_create_post)
router.delete('/:id', todoController.todo_delete)

module.exports = router
