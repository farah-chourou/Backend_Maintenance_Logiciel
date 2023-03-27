const GenereteToken = require("../functions/GenerateToken");
const jwt = require("jsonwebtoken");
const InformaticienModel = require("../models/Informaticien.model");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {
    const { mail, mdp } = req.body;
    //--------------------------------------------------------------------------
    // Verify user by mail
    console.log("nom :", mail);
    console.log("mdp :", mdp);
    let user = await InformaticienModel.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        message: "Please verify your mail",
        success: false,
      });
    }
    //--------------------------------------------------------------------------
    // Verify user password
    const passMatch = await bcrypt.compare(mdp, user?.mdp);
    if (!passMatch) {
      return res.status(400).json({
        message: "Please verify your password",
        success: false,
      });
    }
    const token = GenereteToken.GenerateToken({ _id: user._id }, "3000h");

    return res.status(200).json({
      message: "Logged successfully",
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetUserByToken = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      Message: `Bienvenue ${user.nom} ${user.prenom}.`,
      data: user,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = { Login, GetUserByToken };
