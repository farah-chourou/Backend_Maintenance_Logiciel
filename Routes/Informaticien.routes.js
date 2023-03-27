const express = require("express");
const router = express.Router();
const InformaticienController = require("../controllers/Informaticien.controller");
const AuthentificationController = require("../controllers/Authentification.controller");
const verifToken = require("../middlewares/VerifToken");

// crud devloppeurs --> premet au chef de projet d' ajouter supp modifier les devloppeurs
router.post(
  "/create",
  verifToken.isChef,
  InformaticienController.CreateDeveloper
);
router.get("/get_all", InformaticienController.GetAllDeveloper);
router.get("/get_one/:_id", InformaticienController.GetOne);
router.delete("/delete_one/:_id", InformaticienController.DeleteDeveloper);
router.put(
  "/change_password",
  verifToken.isUser,
  InformaticienController.ChangePassword
);
router.post("/forgot", InformaticienController.ForgotPassword);
router.put("/update_info/:_id", InformaticienController.UpdateInfo);

// Authentification
router.post("/login", AuthentificationController.Login);
router.get("/getUserByToken", AuthentificationController.GetUserByToken);
module.exports = router;
