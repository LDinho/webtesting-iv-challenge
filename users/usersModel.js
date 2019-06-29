const db = require('./../data/dbConfig');

module.exports = {
  getUsers,
  // insert,
  // remove,
}

async function getUsers() {
  return db('users');
}
