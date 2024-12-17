const Bouquet = require('./Bouquet');
// const Cart = require('./Cart');
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
const Likes=sequelize.define("Likes",{});
  
// Relation: User peut liker des Bouquets
User.belongsToMany(Bouquet, { through: Likes  });
Bouquet.belongsToMany (User, { through: Likes} );  

// Relation: Transactions
const Transaction = sequelize.define('Transaction', {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Transaction, {foreignKey:"userLogin"});
Transaction.belongsTo(User, {foreignKey:"userLogin"});
const TransactionBouquets=sequelize.define("TransactionBouquets",{
  qntBouquets:{
    type: DataTypes.INTEGER,
    defaultValue:0,
    allowNull:false
  }
})
Transaction.belongsToMany(Bouquet, { through: TransactionBouquets,
  foreignKey:"transactionId",
  otherKey:"bouquetId"
});
Bouquet.belongsToMany(Transaction, { through: TransactionBouquets,
  foreignKey:"bouquetId",
  otherKey:"transactionId"
});




module.exports = { Bouquet, Fleur, User, BouquetFleur, Transaction, Likes };
