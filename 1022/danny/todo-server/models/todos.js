'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todos.belongsTo(models.Users, {
        foreignKey: 'ownerId',
        targetKey: 'id',
        as: 'owner',
      });
    }
  }
  Todos.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      task: {
        type: DataTypes.STRING(100),
        allowNull: {
          args: false,
          msg: 'Task is required',
        },
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: {
          args: false,
          msg: 'Due date is required',
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Todos',
    }
  );
  return Todos;
};
