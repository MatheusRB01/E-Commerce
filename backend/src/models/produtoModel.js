export default (sequelize, DataTypes) => {

  const Produto = sequelize.define('Produto', {

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },

    descricao: {
      type: DataTypes.TEXT
    },

    preco: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    estoque: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },

    imagem: {
      type: DataTypes.STRING
    }

  })

  return Produto
}