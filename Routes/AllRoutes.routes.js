const express = require("express");
const informaticienRoutes = require("../routes/Informaticien.routes");
const TacheRoutes = require("../routes/Tache.routes");
const ProjetRoutes = require("../routes/Projet.routes");
const router = express.Router();

router.use("/user", informaticienRoutes);
router.use("/task", TacheRoutes);
router.use("/projet", ProjetRoutes);

module.exports = router;
