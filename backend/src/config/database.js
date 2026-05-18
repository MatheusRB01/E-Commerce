import dotenv from "dotenv"

import { Sequelize } from "sequelize"


dotenv.config()
console.log("MYSQL_PUBLIC_URL =", process.env.MYSQL_PUBLIC_URL)

const sequelize = new Sequelize(process.env.MYSQL_PUBLIC_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

export default sequelize