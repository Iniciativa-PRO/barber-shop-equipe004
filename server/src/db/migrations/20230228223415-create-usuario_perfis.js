'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return await queryInterface.createTable('usuario_perfis', { 

      ID: Sequelize.INTEGER,
      USUARIO: Sequelize.STRING

    });

  },

  async down (queryInterface, Sequelize) {

    return await queryInterface.dropTable('usuario_perfis');
    
  }
};
