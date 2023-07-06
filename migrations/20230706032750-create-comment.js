'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up(queryInterface, Sequelize) {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      PostId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Posts',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      ProfileId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Profiles',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
   down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Comments');
  }
};