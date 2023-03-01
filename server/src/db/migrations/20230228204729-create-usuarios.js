'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('usuarios', { 
      ID_USUARIO: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      USUARIO: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      EMAIL: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      SENHA: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      USUARIO_PERFIS: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {

     return await queryInterface.dropTable('usuarios');
 
  }
};
