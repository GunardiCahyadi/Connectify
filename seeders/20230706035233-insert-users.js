'use strict';
const fs = require('fs')
const encrypt = require('../helpers/encrypt')

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
    const users = JSON.parse(fs.readFileSync('./data/users.json','utf-8'))
    users.forEach(el => {
     delete el.id
     el.password = encrypt(el.password)
     el.createdAt = new Date()
     el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Users', users, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null , {})
  }
};
