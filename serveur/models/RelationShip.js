const Bouquet = require('./Bouquet');
const Fleur = require('./Fleur');
const User = require('./User');
const sequelize=require('./index');
const { DataTypes }=require('sequelize');

// Relation: Fleur dans un Bouquet (plusieurs genres de fleurs avec une quantité)
const BouquetFleur = sequelize.define('BouquetFleur', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Bouquet.belongsToMany(Fleur, { through: BouquetFleur });
Fleur.belongsToMany(Bouquet, { through: BouquetFleur });

// Relation: User peut liker des Bouquets
User.belongsToMany(Bouquet, { through: 'Likes' });
Bouquet.belongsToMany(User, { through: 'Likes' });  

// Relation: Transactions
const Transaction = sequelize.define('Transaction', {
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Transaction);
Transaction.belongsTo(User);

Transaction.belongsToMany(Bouquet, { through: 'TransactionBouquets' });
Bouquet.belongsToMany(Transaction, { through: 'TransactionBouquets' });

module.exports = { Bouquet, Fleur, User, BouquetFleur, Transaction };
