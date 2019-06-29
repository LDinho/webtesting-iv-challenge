const db = require('./../data/dbConfig');

module.exports = {
  getUsers,
  insert,
  getUserById,
  remove,
}

async function getUsers() {
  return db('users');
}

async function insert(user) {
  const [id] = await db('users').insert(user);

  return db('users').where({id}).first();

}

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

function remove(id) {
  return db('users')
    .where({ id }).del()
}
