// xxxxxxxx-associate-orders-with-customers.js
const { Customers, Orders } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    Customers.hasMany(Orders, { foreignKey: 'customerId' });
    Orders.belongsTo(Customers, { foreignKey: 'customerId' });
  },
  
  async down(queryInterface, Sequelize) {
    // Rollback code if needed
  }
};
