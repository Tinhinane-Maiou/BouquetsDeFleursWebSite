const express=require("express");

const path=require("path");
const cors = require("cors");
const app=express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, '../client/frontend/public/assets')));
const bouquetsData = [
    {
      id: 1,
      nom: 'Bouquet de Mariage Élégant',
      descr: 'Un arrangement raffiné de roses blanches et de pivoines, parfait pour célébrer le plus beau jour de votre vie.',
      image: '/assets/images/bouquetMariage.jpg', // Utilisation d'un chemin relatif pour l'image
      prix: 3500,
      liked: false,
    },
    {
      id: 2,
      nom: 'Bouquet de Naissance Douceur',
      descr: 'Un bouquet tendre de lys et de gerberas roses pour célébrer l’arrivée d’un nouveau-né avec douceur et bonheur.',
      image: '/assets/images/bouquetNaissance.jpg',
      prix: 2500,
      liked: false,
    },
    {
      id: 3,
      nom: 'Bouquet d’Amour Passionné',
      descr: 'Un bouquet intense de roses rouges et de tulipes pour exprimer la passion et l’amour profond.',
      image: '/assets/images/bouquetAmour.jpg',
      prix: 3000,
      liked: false,
    },
    {
      id: 4,
      nom: 'Bouquet d’Anniversaire Coloré',
      descr: 'Un mélange joyeux de tournesols, de marguerites et de freesias, idéal pour fêter un anniversaire en couleur.',
      image: '/assets/images/bouquetAnniversaire.jpg',
      prix: 2000,
      liked: false,
    },
    {
      id: 5,
      nom: 'Bouquet de Condoléances',
      descr: 'Un bouquet sobre et élégant de lys blancs et de chrysanthèmes pour offrir vos condoléances avec respect et sincérité.',
      image: '/assets/images/bouquetCondoleances.jpg',
      prix: 2800,
      liked: false,
    },
    {
      id: 6,
      nom: 'Bouquet de Remerciements',
      descr: 'Un mélange chaleureux de dahlias et d’orchidées pour exprimer votre gratitude et vos remerciements.',
      image: '/assets/images/bouquetRemerciements.jpg',
      prix: 2700,
      liked: false,
    },
    
  ];

app.get("/api/bouquets",(req,res)=>{
    res.json(bouquetsData);
});

app.listen(5000,()=>{
    console.log(
        "listening on port "+5000
    );
})