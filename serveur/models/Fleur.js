const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Fleur = sequelize.define("Fleur", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prixUni: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Fleur;
