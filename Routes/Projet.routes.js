const express = require("express");
const router = express.Router();
const ProjectController = require("../Controllers/Projet.controller");
const verifToken = require("../middlewares/VerifToken");

router.post("/create", verifToken.isChef, ProjectController.CreateProject);
router.get("/get_all", verifToken.isChef, ProjectController.GetAllProject);
router.get(
  "/get_all_finish",
  verifToken.isUser,
  ProjectController.GetAllProjectFinish
);

router.get("/get_one/:_id", verifToken.isChef, ProjectController.GetOne);
router.delete(
  "/delete_one/:_id",
  verifToken.isChef,
  ProjectController.DeleteProject
);
router.put(
  "/update_info/:_id",
  verifToken.isChef,
  ProjectController.UpdateInfo
);

module.exports = router;
