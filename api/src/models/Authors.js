const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('author', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  });
};