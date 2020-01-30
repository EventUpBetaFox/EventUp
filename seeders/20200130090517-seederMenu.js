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
        name: 'Dashboard',
        url: '/admin',
        icon: 'icon_house_alt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Events',
        url: '/events',
        icon: 'icon_table',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Add Event',
        url: '/events/add',
        icon: 'icon_document_alt',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Menus', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Menus', null, {});
  }
};
