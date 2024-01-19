const express = require('express');
const  {addUser, authenticatorUser}  = require('../controller/user');

const Router = express.Router();

Router.post('/', addUser );

Router.post('/login', authenticatorUser);




module.exports = Router;