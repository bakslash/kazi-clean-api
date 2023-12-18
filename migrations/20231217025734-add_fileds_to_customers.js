'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   
  
   
  

    // Assuming you have the 'Orders' model defined
    const { Customers, Orders } = require('../models');

    // Update the 'Customers' model to define associations with 'Orders'
    Customers.hasMany(Orders, { foreignKey: 'customerId' });
    Orders.belongsTo(Customers, { foreignKey: 'customerId' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Customers', 'join_date');
    await queryInterface.removeColumn('Customers', 'orders_to_date');
    await queryInterface.removeColumn('Customers', 'amount_to_date');
    await queryInterface.removeColumn('Customers', 'last_order_date');
  }
};
