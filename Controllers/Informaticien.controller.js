const InformaticienModel = require("../models/Informaticien.model");
const bcrypt = require("bcrypt");
const Mailer = require("../functions/mail/MailSneder");
const GeneratePassword = require("../functions/GeneratePassword");
const MailMessage = require("nodemailer/lib/mailer/mail-message");

const CreateDeveloper = async (req, res) => {
  try {
    const { nom, prenom, mail, tel, spec } = req.body;
    const existUser = await InformaticienModel.findOne({ mail });
    if (existUser)
      return res.status(409).json({
        Message: "user already exists with that email",
        Success: false,
      });

    const salt = Number(process.env.SALT);
    const password = GeneratePassword();
    const cryptedMdp = await bcrypt.hash(password.toString(), salt);

    const newUser = new InformaticienModel({
      ...req.body,
      mdp: cryptedMdp,
    });
    const createdUser = await newUser.save();

    let subject = "Authentication information";
    let content = `
      <div>
      <h2>Welcome ${nom} ${prenom} to our plateforme</h2>
      <p>here you will find the informations about new account</p>
      <p>your login is : <b>${mail}</b> </p>
      <p>your M-D-P is : <b>${password}</b> </p>
      <p>please make sure to change your password after you access to your account</p>
      </div>`;
    await Mailer.Mail_Sender(mail, content, subject);

    return res.status(200).json({
      Message: "user created suucessfully",
      Success: true,
      data: createdUser,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const DeleteDeveloper = async (req, res) => {
  try {
    const { _id } = req.params;
    const removeDeveloper = await InformaticienModel.deleteOne({ _id });

    if (!removeDeveloper) {
      return res.status(400).json({ Message: "Failed to delete developer" });
    }
    return res.status(200).json({ Message: "developer deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllDeveloper = async (req, res) => {
  try {
    const Developpers = await InformaticienModel.find();
    return res
      .status(200)
      .json({ Message: "Developers found successfully ", data: Developpers });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;

    const Developper = await InformaticienModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: " found successfully ", data: Developper });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const _id = req.user._id;
    const { mdp, oldpassword, confpassword } = req.body;

    const passMatch = await bcrypt.compare(oldpassword, req.user.mdp);
    if (!passMatch) {
      return res.status(400).json({
        Message: "old password is not correct",
        Success: false,
      });
    }

    if (mdp !== confpassword) {
      return res
        .status(400)
        .json({ Message: "Confirm your Password", Success: false });
    }

    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(mdp, Number(salt));

    const updateUser = await InformaticienModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          mdp: cryptedMdp,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "updated successfully", data: updateUser });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { mail } = req.body;
    if (!mail) {
      return res
        .status(400)
        .json({ Message: "mail is required", Success: false });
    }
    const existUser = await InformaticienModel.findOne({ mail });

    if (!existUser) {
      return res.status(400).json({
        Message: "there's no user with that email",
        Success: false,
      });
    }

    const password = GeneratePassword();
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const updateUser = await InformaticienModel.findOneAndUpdate(
      { _id: existUser._id },
      {
        $set: {
          mdp: cryptedMdp,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }

    // SENDING THE LOGIN AND PASSWORD TO USER WITH MAIL
    let subject = "Password Recover";
    let content = `
          <div>
          <h2>Welcome ${existUser.nom} ${existUser.prenom} to our plateforme</h2>
          <p>we recieved a request to recover your password</p>
          <p>your new password is : <b>${password}</b> </p>
          <p>please make sure to change your password after you access to your account</p>
          </div>`;
    await Mailer.Mail_Sender(existUser.mail, content, subject);

    return res
      .status(200)
      .json({ Message: "new password sent to your mail box" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateInfo = async (req, res) => {
  try {
    const { _id } = req.params;
    const updatedUser = await InformaticienModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res.status(200).json({ Message: "User updated", data: updatedUser });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  CreateDeveloper,
  DeleteDeveloper,
  GetAllDeveloper,
  GetOne,
  ForgotPassword,
  ChangePassword,
  UpdateInfo,
};
