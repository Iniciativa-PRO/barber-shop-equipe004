'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('usuarios', { 
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      usuario_perfis: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      id_servico: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'schedulings',
            key: 'id_agendamento'
        },
        onUpdate: 'CASCADE',
      },
      id_agendamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'services',
            key: 'id_servico'
        },
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {

     return await queryInterface.dropTable('usuarios');
 
  }
};
