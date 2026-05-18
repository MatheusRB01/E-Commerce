import sequelize from "../config/database.js"
import { DataTypes } from "sequelize"

import UserModel from "./User.js"
import ProdutoModel from "./produtoModel.js"
import MessageModel from "./message.js"

const db = {
  sequelize,
  User: UserModel(sequelize, DataTypes),
  Produto: ProdutoModel(sequelize, DataTypes),
  Message: MessageModel(sequelize, DataTypes)
}

export default db