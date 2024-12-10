const express = require("express");
const Bouquet = require("./models/Bouquet");
const sequelize = require("./models/index");
const seedDatabase = require("./models/seedDatabase");
const path = require("path");
const cors = require("cors");
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
    // Transforme les instances Sequelize en objets JavaScript simples
    const bouquetsData = bouquets.map((bouquet) =>
      bouquet.get({ plain: true })
    );
    console.log(bouquetsData);
    res.json(bouquetsData); // Retourne les bouquets au frontend
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des bouquets" });
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
