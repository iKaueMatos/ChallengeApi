/* Middleware validation*/
const userAlreadyExists = require('../middleware/userAlreadyExists');
const todoValidation = require('../utils/todoValidation');

const express = require('express');
const { v4: uuidV4 } = require("uuid");
const router = express.Router();
const users = [];

router.post('/users', userAlreadyExists, (request, response) => {
  const {name, username} = request.body;
  const userAlreadyExistsValidation = users.some((user) => user.username === username);
  
  if (userAlreadyExistsValidation) {
    return response.status(400).json({error: "User already exists!"});
  }

  const user = {
      id: uuidV4(),
      name, 
      username, 
      todos: []
  }

  users.push(user);
  return response.status(201).json(user);
});

router.get('/todos', userAlreadyExists, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

router.post('/todos', userAlreadyExists, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const todo = {
    id: uuidV4(), 
    title,
    done,
    deadline: new Date(deadline),
    create_at: new Date() 
  }

  user.todos.push(todo);
  return response.status(201).json(todo);
});

router.put('/todos/:id', userAlreadyExists, (request, response) => {
  const {title, deadline } = request.body;
  const { user } = request;
  const { id } = request.params;

  const todo = user.find(todo => todo.id === id);
  todoValidation(todo);

  todo.title = title;
  todo.deadline = new Date(deadline);

  return response.json(todo);
});

router.patch('/todos/:id/done', userAlreadyExists, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todo = user.find(todo => todo.id === id);
  todoValidation(todo);
  todo.done = true;

  return response.json(todo);
});

router.delete('/todos/:id', userAlreadyExists, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todo = user.findIndex(todo => todo.id === id);
  user.todos.splice(todo, 1);

  return response.status(204);
});

module.exports = router;