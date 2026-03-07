const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('adsbanner', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {       // 🔹 Nuevo campo para la URL de destino
      type: DataTypes.STRING,
      allowNull: true
    }
  },{
    timestamps: true,
  });
}