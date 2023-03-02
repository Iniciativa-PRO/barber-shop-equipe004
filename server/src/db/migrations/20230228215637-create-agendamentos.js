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
            key: 'id_servico'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id_usuario'
        },
        onUpdate: 'CASCADE',
      },
    });
  },

  async down (queryInterface, Sequelize) {

    return await queryInterface.dropTable('agendamentos');

  }
};
