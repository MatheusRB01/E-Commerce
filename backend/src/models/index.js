import sequelize from "../config/database.js"
import { DataTypes } from "sequelize"

import UserModel from "./User.js"
import MessageModel from "./message.js"
import ProdutoModel from "./produtoModel.js"

const db = {
  sequelize,
  User: UserModel(sequelize, DataTypes),
  Message: MessageModel(sequelize, DataTypes),
  Produto: ProdutoModel(sequelize, DataTypes)
}

export default db