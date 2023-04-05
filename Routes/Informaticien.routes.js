const express = require("express");
const router = express.Router();
const InformaticienController = require("../Controllers/Informaticien.controller");
const AuthentificationController = require("../Controllers/Authentification.controller");
const verifToken = require("../middlewares/VerifToken");

// crud devloppeurs --> premet au chef de projet d' ajouter supp modifier les devloppeurs
router.post(
  "/create",
  verifToken.isChef,
  InformaticienController.CreateDeveloper
);
router.get(
  "/get_all",
  verifToken.isChef,
  InformaticienController.GetAllDeveloper
);
router.get("/get_one/:_id", verifToken.isChef, InformaticienController.GetOne);
router.delete(
  "/delete_one/:_id",
  verifToken.isChef,
  InformaticienController.DeleteDeveloper
);
router.put(
  "/change_password",
  verifToken.isUser,
  InformaticienController.ChangePassword
);
router.post(
  "/forgot",
  verifToken.isUser,
  InformaticienController.ForgotPassword
);
router.put("/update_info/:_id", InformaticienController.UpdateInfo);

// Authentification
router.post("/login", AuthentificationController.Login);
router.get(
  "/getUserByToken",
  verifToken.isUser,
  AuthentificationController.GetUserByToken
);
module.exports = router;
