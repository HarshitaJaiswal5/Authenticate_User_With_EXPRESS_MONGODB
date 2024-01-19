const express = require('express');

const { getTodo, addTodo, updateTodo, deleteTodo } = require('../controller/todo');

const Router = express.Router();

Router.get('/', getTodo );

Router.post('/', addTodo);

Router.patch('/:id', updateTodo);

Router.delete('/:id', deleteTodo);


module.exports = Router;