'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {

    static associate(models) {
      Orders.belongsTo(models.Customers, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE', // Cascade deletion when a customer is deleted
        onUpdate: 'CASCADE', // Cascade update when a customer's ID is updated
      });
    }
    
  }

  Orders.init({
    discountAmount: DataTypes.INTEGER,
    discountReason: DataTypes.STRING,
    service: DataTypes.STRING,
    uom: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    pickUpTime: DataTypes.TIME,
    pickDate: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    // Add other fields related to orders here

    // Foreign key for customer
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers', // Assuming your customer model is named 'Customers'
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Orders',
  });

  return Orders;
};
