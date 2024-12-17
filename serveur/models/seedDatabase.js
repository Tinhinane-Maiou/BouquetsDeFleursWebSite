const { Bouquet, Fleur, User,Likes} = require('./RelationShip');
const sequelize =require('./index');

async function seedDatabase() {
  await sequelize.sync({ force: true }); 
  await Likes.destroy({ where: {} }); 
  // Utilisateurs
  const tintin= await User.findOrCreate({
    where: { login: 'mayoutinhinane7@gmail.com' },
    defaults: { password: 'tin20hi7na20ne', nomUser: 'Tinhinane' },
  });
  const fadou= await User.findOrCreate({
    where: { login: 'fadila.maiou@se.univ-bejaia.dz' },
    defaults: { password: 't20hi7na20ne', nomUser: 'Fadila' },
  });

  // Fleurs
  const rose = await Fleur.findOrCreate({
    where: { nom: 'Rose' },
    defaults: { description: 'Beautiful red rose', prixUni: 2.5 },
  });
  const tulip = await Fleur.findOrCreate({
    where: { nom: 'Tulip' },
    defaults: { description: 'Beautiful pink tulip', prixUni: 2 },
  });

  // Bouquets
  const bouquet1 = await Bouquet.findOrCreate({
    where: { nom: 'Bouquet de Mariage Élégant' },
    defaults: {
      description: 'Un arrangement raffiné de roses blanches et de pivoines, parfait pour célébrer le plus beau jour de votre vie.',
      image: '/assets/images/bouquetMariage.jpg',
      prix:3500,
      totalLikes: 2,
    },
  });
 

  const bouquet2 = await Bouquet.findOrCreate({
    where: { nom: 'Bouquet de Naissance Douceur' },
    defaults: {
      description: 'Un bouquet tendre de lys et de gerberas roses pour célébrer l’arrivée d’un nouveau-né avec douceur et bonheur.',
      image: '/assets/images/bouquetNaissance.jpg',
      prix:2500,
      totalLikes: 1,
    },
  });
  const bouquet3 = await Bouquet.findOrCreate({
    where: { nom: 'Bouquet d’Amour Passionné' },
    defaults: {
      description: 'Un bouquet intense de roses rouges et de tulipes pour exprimer la passion et l’amour profond.',
      image: '/assets/images/bouquetAmour.jpg',
      prix:3000,
      totalLikes: 5,
    },
  });
  const bouquet4 = await Bouquet.findOrCreate({
    where: { nom: 'Bouquet d’Anniversaire Coloré' },
    defaults: {
      description: 'Un mélange joyeux de tournesols, de marguerites et de freesias, idéal pour fêter un anniversaire en couleur.',
      image: '/assets/images/bouquetAnniversaire.jpg',
      prix:2000,
      totalLikes: 3,
    },
  });
  const bouquet5 = await Bouquet.findOrCreate({
    where: { nom: 'Bouquet de Condoléances' },
    defaults: {
      description: 'Un bouquet sobre et élégant de lys blancs et de chrysanthèmes pour offrir vos condoléances avec respect et sincérité.',
      image: '/assets/images/bouquetCondoleances.jpg',
      prix:2800,
      totalLikes: 7,
    },
  });

 


  // Relation fleurs-bouquets
  await Likes.findOrCreate({
    where: { UserId: tintin[0].id, BouquetId: bouquet1[0].id }
  });
  await Likes.findOrCreate({
    where: { UserId: fadou[0].id, BouquetId: bouquet1[0].id }
  });
  
  
  await bouquet1[0].addFleur(rose[0], { through: { quantity: 10 } });
  await bouquet1[0].addFleur(tulip[0], { through: { quantity: 5 } });
  await bouquet2[0].addFleur(rose[0], { through: { quantity: 20} });
  await bouquet2[0].addFleur(tulip[0], { through: { quantity: 3 } });
  await bouquet3[0].addFleur(rose[0], { through: { quantity: 25} });
  await bouquet3[0].addFleur(tulip[0], { through: { quantity: 8 } });
  await bouquet4[0].addFleur(rose[0], { through: { quantity: 30} });
  await bouquet4[0].addFleur(tulip[0], { through: { quantity: 10 } });
  await bouquet5[0].addFleur(rose[0], { through: { quantity: 23} });
  

  console.log('Database seeded successfully!');
}

module.exports = seedDatabase;
