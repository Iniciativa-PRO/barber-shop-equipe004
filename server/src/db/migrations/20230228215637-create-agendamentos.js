'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return await queryInterface.createTable('agendamentos', { 

      ID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      DATA_AGENDAMENTO: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ID_SERVICO: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'servicos',
            key: 'ID_SERVICO'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ID_USUARIO: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'ID_USUARIO'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },

  async down (queryInterface, Sequelize) {

    return await queryInterface.dropTable('agendamentos');

  }
};
