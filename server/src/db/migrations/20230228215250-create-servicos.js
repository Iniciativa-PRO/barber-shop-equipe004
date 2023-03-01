'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    return await queryInterface.createTable('servicos', { 

      ID_SERVICO: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      NOME: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      LOJA: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      PRECO: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DESCRICAO: {
          type: Sequelize.STRING,
          allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {

    return await queryInterface.dropTable('servicos');

  }
};
