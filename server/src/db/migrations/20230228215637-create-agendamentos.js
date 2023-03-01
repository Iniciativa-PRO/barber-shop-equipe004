'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return await queryInterface.createTable('agendamentos', { 

      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      data_agendamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_servico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'services',
            key: 'ID_SERVICO'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
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
