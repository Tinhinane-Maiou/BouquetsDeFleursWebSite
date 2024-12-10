const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Bouquet = sequelize.define("Bouquet", {
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
  image: {
    type: DataTypes.STRING, 
    allowNull: true, // Peut être null si aucune image n'est fournie
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  liked:{
    type : DataTypes.BOOLEAN,
    defaultValue:false
  }
,
  totalLikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
module.exports = Bouquet;
