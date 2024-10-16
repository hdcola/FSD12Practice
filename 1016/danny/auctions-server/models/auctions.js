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
          len: [2, 100],
          is: /^[a-zA-Z0-9 .,_()\-]+$/i,
        },
      },
      itemDescription: {
        type: DataTypes.STRING(10000),
        allowNull: false,
        validate: {
          len: [2, 10000],
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
