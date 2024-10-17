module.exports = (sequelize, DataTypes) => {
  const Auctions = sequelize.define(
    'Auctions',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sellerEmail: {
        type: DataTypes.STRING(320),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      itemName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [2, 100],
            msg: 'Item name must be between 2 and 100 characters',
          },
          is: {
            args: /^[a-z ]+$/i,
            msg: 'Item name can only contain letters, numbers, spaces, and .,_()- characters',
          },
        },
      },
      itemDescription: {
        type: DataTypes.STRING(10000),
        allowNull: false,
        validate: {
          len: {
            args: [2, 10000],
            msg: 'Item description must be between 2 and 10000 characters',
          },
        },
      },
      lastPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      lastBidderEmail: {
        type: DataTypes.STRING(320),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {}
  );
  Auctions.associate = function (models) {
    // associations can be defined here
  };
  return Auctions;
};
