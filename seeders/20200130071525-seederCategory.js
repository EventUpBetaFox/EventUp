'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const data = [
      {
        name: 'Sport',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Music',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Education',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Finance',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Entertainment',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Categories', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
