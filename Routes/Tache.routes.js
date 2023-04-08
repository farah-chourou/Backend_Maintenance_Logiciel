const express = require("express");
const router = express.Router();
const TacheController = require("../Controllers/Tache.controller");
const multer = require("../Utils/Multer");
const verifToken = require("../middlewares/VerifToken");

router.post(
  "/create/:idProject",
  verifToken.isChef,
  TacheController.CreateTache
);
router.get("/get_all", verifToken.isUser, TacheController.GetAllTache);
router.get(
  "/get_all_of_project/:idProject",
  verifToken.isChef,
  TacheController.GetAllTacheOfProject
);

router.get(
  "/get_all_of_developer",
  verifToken.isDevelopper,
  TacheController.GetAllTacheOfDeveloper
);

router.delete("/delete_one/:_id", TacheController.DeleteTache);
router.put(
  "/update_info/:_id/:idProjet",
  verifToken.isChef,
  TacheController.UpdateInfo
);

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
  multer.uploadDoc,
  verifToken.isDevelopper,

  TacheController.AddDocument
);

// for both
router.get("/get_one/:_id", verifToken.isUser, TacheController.GetOne);
router.get(
  "/get_all_tasks_en_cours",
  verifToken.isUser,
  TacheController.GetAllTasksEnCours
);

router.get(
  "/get_all_tasks_realiser",
  verifToken.isUser,
  TacheController.GetAllTasksRealiser
);
module.exports = router;
