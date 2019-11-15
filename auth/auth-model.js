const db = require('../database/dbConfig');

module.exports = {
  findBy,
  findById,
  add
}

function findBy(filter) {
  return db('users')
    // .select('id', 'username', 'password')
    .where(filter);
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}