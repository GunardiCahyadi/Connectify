'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const posts = JSON.parse(fs.readFileSync('./data/posts.json','utf-8'))
    posts.forEach(el => {
     delete el.id
     el.createdAt = new Date()
     el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Posts', posts, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Posts', null , {})
  }
};
