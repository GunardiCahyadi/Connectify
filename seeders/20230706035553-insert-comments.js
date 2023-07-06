'use strict';

const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const comments = JSON.parse(fs.readFileSync('./data/comments.json','utf-8'))
    comments.forEach(el => {
     delete el.id
     el.createdAt = new Date()
     el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Comments', comments, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Comments', null , {})
  }
};
