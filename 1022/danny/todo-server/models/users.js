'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Todos, {
        foreignKey: 'ownerId',
        sourceKey: 'id',
        as: 'todos',
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(360),
        allowNull: {
          args: false,
          msg: 'Email is required',
        },
        unique: {
          args: true,
          msg: 'Email already exists',
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: { args: false, msg: 'Password is required' },
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );
  return Users;
};
