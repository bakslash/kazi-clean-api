// models/Users.js

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.createUser = async (email, role, hashedPassword) => {
    return Users.create({
      email,
      role,
      password: hashedPassword,
    });
    {tableName: 'Users'}
  };
 
  return Users;
};
