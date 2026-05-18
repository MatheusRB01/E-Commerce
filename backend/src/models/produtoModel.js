import db from '../config/db.js'

const getAll = (callback) => {
  db.query('SELECT * FROM produtos', callback)
}

const getById = (id, callback) => {
  db.query('SELECT * FROM produtos WHERE id = ?', [id], callback)
}

const create = (produto, callback) => {
  db.query('INSERT INTO produtos SET ?', produto, callback)
}

const update = (id, produto, callback) => {
  db.query('UPDATE produtos SET ? WHERE id = ?', [produto, id], callback)
}

const remove = (id, callback) => {
  db.query('DELETE FROM produtos WHERE id = ?', [id], callback)
}

export default {
  getAll,
  getById,
  create,
  update,
  remove
}