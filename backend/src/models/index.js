import sequelize from "../config/database.js"
import { DataTypes } from "sequelize"

import UserModel from "./User.js"
import MessageModel from "./message.js"
import ProdutoModel from "./produtoModel.js"

const db = {
  sequelize,
  Sequelize: sequelize
}

// models
db.User = UserModel(sequelize, DataTypes)
db.Message = MessageModel(sequelize, DataTypes)
db.Produto = ProdutoModel(sequelize, DataTypes)

export default db