'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return await queryInterface.createTable('usuario_perfis', { 

      id: Sequelize.INTEGER,
      usuario: Sequelize.STRING

    });

  },

  async down (queryInterface, Sequelize) {

    return await queryInterface.dropTable('usuario_perfis');
    
  }
};
