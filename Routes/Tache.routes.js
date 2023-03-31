const express = require("express");
const router = express.Router();
const TacheController = require("../controllers/Tache.controller");
const multer = require("../utils/Multer");
const verifToken = require("../middlewares/VerifToken");

router.post(
  "/create/:idProject/:idDeveloper",
  verifToken.isChef,
  TacheController.CreateTache
);
router.get(
  "/get_all_of_project/:idProject",
  TacheController.GetAllTacheOfProject
);
router.get(
  "/get_all_of_developer/:idDeveloper",
  TacheController.GetAllTacheOfDeveloper
);

router.delete("/delete_one/:_id", TacheController.DeleteTache);
router.put("/update_info/:_id", TacheController.UpdateInfo);

// for developper
router.get(
  "/get_all_tasks",
  verifToken.isDevelopper,
  TacheController.GetAllTasks
);
router.get(
  "/get_all_projects",
  verifToken.isDevelopper,
  TacheController.GetAllProjects
);
router.put(
  "/updateEtat/:_id",
  verifToken.isDevelopper,
  TacheController.UpdateEtat
);
router.put(
  "/addDocument/:_id",
  verifToken.isDevelopper,
  multer.uploadDoc,
  TacheController.AddDocument
);

// for both
router.get("/get_one/:_id", verifToken.isUser, TacheController.GetOne);

module.exports = router;
