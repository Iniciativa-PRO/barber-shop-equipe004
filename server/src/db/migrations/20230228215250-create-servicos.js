'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    return await queryInterface.createTable('servicos', { 

      id_servico: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      loja: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
          type: Sequelize.STRING,
          allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {

    return await queryInterface.dropTable('servicos');

  }
};
