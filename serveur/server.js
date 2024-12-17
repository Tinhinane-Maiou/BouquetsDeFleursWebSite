const express = require("express");
const Bouquet = require("./models/Bouquet");
const sequelize = require("./models/index");
const seedDatabase = require("./models/seedDatabase");
const path = require("path");
const cors = require("cors");
const { create } = require("domain");
const User = require("./models/User");
// const Cart = require("./models/Cart");
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(
  "/assets",
  express.static(path.join(__dirname, "./public/assets"))
);


app.get("/api/bouquets", async (req, res) => {
  try {
    // Récupérer tous les bouquets
    const bouquets = await Bouquet.findAll();
   
    res.json(bouquets); // Retourne les bouquets au frontend
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des bouquets" });
  }
});
app.post("/api/bouquets/:id/like", async (req, res) => {
  try {
    const bouquet = await Bouquet.findByPk(req.params.id);
    if (bouquet) {
     
      bouquet.totalLikes +=1;
      bouquet.liked=1;
      await bouquet.save();
      res.json(bouquet);
    } else {
      res.status(404).json({ error: "Bouquet non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du like du bouquet" });
  }
});

app.post("/api/bouquets/:id/unlike", async (req, res) => {
  try {
    const bouquet = await Bouquet.findByPk(req.params.id);
    if (bouquet && bouquet.totalLikes > 0) {
      bouquet.totalLikes -= 1;
      bouquet.liked=0
      await bouquet.save();
      res.json(bouquet);
    } else {
      res.status(404).json({ error: "Bouquet non trouvé ou déjà à 0 likes" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du unlike du bouquet" });
  }
});
app.get("/api/bouquets/:id/userlikes", async (req,res)=>{
  try {
    const bouquet = await Bouquet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          through: "Likes", // Assure-toi que le nom de la table pivot est correct
        },
      ],
       // Inclut les utilisateurs ayant liké+
    });
    if (!bouquet) {
      return res.status(404).json({ error: "Bouquet non trouvé" });
    }
    const users = bouquet.Users;
    res.json({ users, bouquet });

  } catch (error) {
    res.status(500).json({ error: "erreur lors de récuperation  des  users qui ont liké le bouquet" });
  }
});

// Lancer le seed
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await seedDatabase();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.listen(5000, () => {
  console.log("listening on port " + 5000);
});
