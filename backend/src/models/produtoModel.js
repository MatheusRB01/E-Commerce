import db from '../config/db.js'

export const getAll = (callback) => {
  db.query('SELECT * FROM produtos', callback)
}

export const getById = (id, callback) => {
  db.query('SELECT * FROM produtos WHERE id = ?', [id], callback)
}

export const create = (produto, callback) => {
  db.query('INSERT INTO produtos SET ?', produto, callback)
}

export const update = (id, produto, callback) => {
  db.query('UPDATE produtos SET ? WHERE id = ?', [produto, id], callback)
}

export const remove = (id, callback) => {
  db.query('DELETE FROM produtos WHERE id = ?', [id], callback)
}