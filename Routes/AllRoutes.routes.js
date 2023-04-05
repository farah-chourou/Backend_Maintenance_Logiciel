const express = require("express");
const informaticienRoutes = require("./Informaticien.routes");
const TacheRoutes = require("./Tache.routes");
const ProjetRoutes = require("./Projet.routes");
const router = express.Router();

router.use("/user", informaticienRoutes);
router.use("/task", TacheRoutes);
router.use("/projet", ProjetRoutes);

module.exports = router;
