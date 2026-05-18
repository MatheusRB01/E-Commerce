import db from '../config/db.js'

// LISTAR
export const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM produtos')
  return rows
}

// POR ID
export const getById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM produtos WHERE id = ?',
    [id]
  )
  return rows[0]
}

// CRIAR
export const create = async (produto) => {
  const [result] = await db.query(
    'INSERT INTO produtos SET ?',
    produto
  )
  return result
}

// ATUALIZAR
export const update = async (id, produto) => {
  const [result] = await db.query(
    'UPDATE produtos SET ? WHERE id = ?',
    [produto, id]
  )
  return result
}

// DELETAR
export const remove = async (id) => {
  const [result] = await db.query(
    'DELETE FROM produtos WHERE id = ?',
    [id]
  )
  return result
}