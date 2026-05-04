import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [10, 15]
        }
    },
    role: {
        type: DataTypes.ENUM('cliente', 'admin'),
        defaultValue: 'cliente'
    }
})

export default User