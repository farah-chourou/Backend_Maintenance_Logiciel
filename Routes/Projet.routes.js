const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/Projet.controller");
const verifToken = require("../middlewares/VerifToken");

router.post("/create", verifToken.isChef, ProjectController.CreateProject);
router.get("/get_all", ProjectController.GetAllProject);
router.get("/get_one/:_id", ProjectController.GetOne);
router.delete("/delete_one/:_id", ProjectController.DeleteProject);
router.put("/update_info/:_id", ProjectController.UpdateInfo);

module.exports = router;
