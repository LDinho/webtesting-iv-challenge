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

server.post('/users', async (req, res) => {
  const user = req.body;
  const users = await Users.insert(user);
  res.status(201).json(users);

});

server.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await Users.remove(id);
  res.status(200).json({ message: `${user} deleted` });

});

module.exports = server;
