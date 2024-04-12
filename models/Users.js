const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Users = sequelize.define("users", {
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
}, { updatedAt: false });

module.exports = Users;