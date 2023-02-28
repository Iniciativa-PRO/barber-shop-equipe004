const { Sequelize } = require('sequelize');
const db = require('../db/connect');

db.define("", {
  ID_USUARIO: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  USUARIO: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  EMAIL: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  SENHA: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  USUARIO_PERFIS: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = db;