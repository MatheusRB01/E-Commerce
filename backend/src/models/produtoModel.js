import db from '../config/db.js'

export default (sequelize, DataTypes) => {
  const Produto = sequelize.define("Produto", {
    nome: DataTypes.STRING,
    preco: DataTypes.FLOAT,
    descricao: DataTypes.TEXT,
    imagem: DataTypes.STRING
  })

  return Produto
}