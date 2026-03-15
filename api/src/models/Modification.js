const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('modification', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    action: {               
      type: DataTypes.STRING, // 'publicada', 'rechazada', 'guardada'
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  });
};