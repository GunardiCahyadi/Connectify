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
    const profiles = JSON.parse(fs.readFileSync('./data/profiles.json','utf-8'))
    profiles.forEach(el => {
     delete el.id
     el.createdAt = new Date()
     el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Profiles', profiles, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Profiles', null , {})
  }
};
