const express = require('express');
const server = express();
server.use(express.json());

const Users = require('./../users/usersModel');

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});


server.get('/users', async (req, res) => {

  const users = await Users.getUsers();
  res.status(200).json(users);

});

module.exports = server;
